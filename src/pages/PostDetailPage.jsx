// PostDetailPage.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import UserAvatar from "../components/UserAvatar";
import CommentForm from "../components/CommentForm";
import { auth } from "../firebase-config"; // Import auth to get the current user

export default function PostDetailPage() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const postUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${params.postId}.json`;
  const commentsBaseUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/comments/`;

  const currentUserId = auth.currentUser?.uid; // Get the current user's UID

  useEffect(() => {
    async function getPost() {
      const response = await fetch(postUrl);
      const postData = await response.json();
      postData.id = params.postId;

      // Initialize likes and isLiked if they don't exist
      if (postData.likes === undefined) postData.likes = 0;
      if (postData.isLiked === undefined) postData.isLiked = false;

      setPost(postData);

      // Only call getComments if there are comments
      if (postData.comments) {
        getComments(postData.comments);
      } else {
        setComments([]); // Ensure comments state is empty if no comments
      }
    }

    async function getComments(commentIds) {
      const commentKeys = Object.keys(commentIds);
      const commentsPromises = commentKeys.map((key) =>
        fetch(`${commentsBaseUrl}${key}.json`).then((res) =>
          res.json().then((commentData) => ({ ...commentData, id: key }))
        )
      );
      const commentsData = await Promise.all(commentsPromises);
      setComments(commentsData);
    }

    getPost();
  }, [params.postId, postUrl, commentsBaseUrl]);

  const handleLike = async () => {
    if (!post) return;

    // Toggle the isLiked status
    const updatedIsLiked = !post.isLiked;

    // Update likes count
    const updatedLikes = updatedIsLiked ? post.likes + 1 : post.likes - 1;

    // Create the updated post object
    const updatedPost = {
      ...post,
      isLiked: updatedIsLiked,
      likes: updatedLikes,
    };

    // Update the post in Firebase
    try {
      await fetch(postUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      // Update the post state after successful update
      setPost(updatedPost);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    try {
      // Delete the comment from the comments node
      await fetch(`${commentsBaseUrl}${commentId}.json`, {
        method: "DELETE",
      });

      // Remove the comment ID from the post's comments
      const updatedComments = { ...post.comments };
      delete updatedComments[commentId];

      // Update the post in Firebase
      const updatedPost = { ...post, comments: updatedComments };
      await fetch(postUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      // Update the post state
      setPost(updatedPost);

      // Update the comments state
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <section className="page">
      <section className="timeline-container">
        <section className="timeline">
          {/* Show the post */}
          {post && (
            <div>
              <PostCard post={post} />
              {/* Like Button */}
              <button
                onClick={handleLike}
                style={{
                  margin: "10px 0",
                  color: post.isLiked ? "red" : "black",
                }}
              >
                {post.isLiked ? "Like" : "Like"} ({post.likes})
              </button>
            </div>
          )}
          {/* Show the comment section */}
          <CommentForm postId={params.postId} />
          {/* Show the comments */}
          <section className="comments">
            <h2>Comments</h2>
            <article className="post-card">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <UserAvatar uid={comment.userId} />
                  <p>{new Date(comment.createdAt).toLocaleString()}</p>
                  <p>{comment.comment}</p>
                  {/* Show delete button if current user is the post owner */}
                  {currentUserId === post?.userId && (
                    <button onClick={() => deleteComment(comment.id)}>
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </article>
          </section>
        </section>
      </section>
    </section>
  );
}
