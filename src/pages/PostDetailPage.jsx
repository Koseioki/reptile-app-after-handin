// PostDetailPage.js
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import UserAvatar from "../components/UserAvatar";
import CommentForm from "../components/CommentForm";
// import { auth } from "../firebase-config"; // Import auth to get the current user

export default function PostDetailPage() {


  // Kosei: post detail page for comments

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const postUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${params.postId}.json`;
  const commentsBaseUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/comments/`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(postUrl);
      const postData = await response.json();
      postData.id = params.postId;
      setPost(postData);
      // console.log(postData.comments); // Kosei: this is the comments array (all the comments of this posts)
      getComments(postData.comments);
    }

    async function getComments(commentIds) {
      // Kosei: commendIds has the keys of the comments to this post
      // Kosei: and this function does the loop thingy to get all the comments
      // console.log(commentIds);
      const commentKeys = Object.keys(commentIds);
      // console.log(commentKeys);
      const commentsPromises = commentKeys.map(key => fetch(commentsBaseUrl + key + ".json").then(res => res.json()));
      const commentsData = await Promise.all(commentsPromises);
      setComments(commentsData);
    }

    getPost();
    // console.log(params.postId);
  }, [params.postId, postUrl, commentsBaseUrl]);

  async function handleDelete(comment) {
    // I want to delete a comment here
    console.log(comment);
    
    // 
    // 
    // 
  }

  return (
    <section className="page">
      <h1>Home</h1>
      <section className="timeline-container">
        <section className="timeline">

          {/* show the post */}
          {post && <PostCard post={post} />}
          {/* show the comment section */}
          {/* send CommentForm the ID of this post */}
          <CommentForm postId={params.postId} />


          {/* show the comments */}
          <section className="comments">
            <h2>Comments</h2>

            <article className="post-card">
              {comments.map((comment, index) => (
                <div key={index}>
                  <UserAvatar uid={comment.userId} />
                  {/* <p>{comment.userId}</p> */}
                  <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p>{comment.comment}</p>
                  <button onClick={() => handleDelete(comment)}>Delete this comment</button>

                </div>
              ))}


            </article>

          </section>

        </section>
      </section>
    </section>
  )
}



// const [post, setPost] = useState();
// const [comments, setComments] = useState([]);
// const params = useParams();
// const navigate = useNavigate();
// const postUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${params.postId}.json`;
// const commentsBaseUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/comments/`;

// const currentUserId = auth.currentUser?.uid; // Get the current user's UID

// useEffect(() => {
//   async function getPost() {
//     const response = await fetch(postUrl);
//     const postData = await response.json();
//     postData.id = params.postId;

//     // Initialize likedBy array if it doesn't exist
//     if (!postData.likedBy) postData.likedBy = [];

//     // Determine if the current user has liked the post
//     const isLiked = postData.likedBy.includes(currentUserId);

//     // Set the post state with isLiked and likes count
//     setPost({ ...postData, isLiked, likes: postData.likedBy.length });

//     // Fetch comments as before...
//   }


//   async function getComments(commentIds) {
//     const commentKeys = Object.keys(commentIds);
//     const commentsPromises = commentKeys.map((key) =>
//       fetch(`${commentsBaseUrl}${key}.json`).then((res) =>
//         res.json().then((commentData) => ({ ...commentData, id: key }))
//       )
//     );
//     const commentsData = await Promise.all(commentsPromises);
//     setComments(commentsData);
//   }


//   getPost();
// }, [params.postId, postUrl, commentsBaseUrl]);

// const handleLike = async () => {
//   if (!post) return;

//   let updatedLikedBy = [...post.likedBy];
//   let updatedIsLiked = false;

//   if (post.isLiked) {
//     // User is unliking the post
//     updatedLikedBy = updatedLikedBy.filter((uid) => uid !== currentUserId);
//   } else {
//     // User is liking the post
//     updatedLikedBy.push(currentUserId);
//     updatedIsLiked = true;
//   }

//   const updatedPost = {
//     ...post,
//     likedBy: updatedLikedBy,
//     isLiked: updatedIsLiked,
//     likes: updatedLikedBy.length,
//   };

//   try {
//     await fetch(postUrl, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...updatedPost,
//         isLiked: undefined,
//         likes: undefined,
//       }),
//     });

//     setPost(updatedPost);
//   } catch (error) {
//     console.error("Error updating likes:", error);
//   }
// };


// // Function to delete a comment
// const deleteComment = async (commentId) => {
//   if (!window.confirm("Are you sure you want to delete this comment?")) {
//     return;
//   }
//   try {
//     // Delete the comment from the comments collection
//     await fetch(`${commentsBaseUrl}${commentId}.json`, {
//       method: "DELETE",
//     });

//     // Remove the comment ID from the post's comments
//     const updatedComments = { ...post.comments };
//     delete updatedComments[commentId];

//     // Update the post's comments in Firebase
//     await fetch(postUrl, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ comments: updatedComments }),
//     });

//     // Update the local state
//     setPost((prevPost) => ({
//       ...prevPost,
//       comments: updatedComments,
//     }));
//     setComments((prevComments) =>
//       prevComments.filter((comment) => comment.id !== commentId)
//     );
//   } catch (error) {
//     console.error("Error deleting comment:", error);
//   }
// };


// return (
//   <section className="page" id="main-content">
//     <section className="timeline-container">
//       <section className="timeline">
//         {/* Show the post */}
//         {post && (
//           <div>
//             <PostCard post={post} />
//             {/* Like Button */}
//             <button
//               onClick={handleLike}
//               style={{
//                 margin: "10px 0",
//                 color: post.isLiked ? "red" : "black",
//               }}
//             >
//               {post.isLiked ? "Like" : "Like"} ({post.likes})
//             </button>
//           </div>
//         )}
//         {/* Show the comment section */}
//         <CommentForm postId={params.postId} />
//         {/* Show the comments */}
//         <section className="comments">
//           <h2>Comments</h2>
//           <article className="post-card">
//             {comments.map((comment) => (
//               <div key={comment.id}>
//                 <UserAvatar uid={comment.userId} />
//                 <p>{new Date(comment.createdAt).toLocaleString()}</p>
//                 <p>{comment.comment}</p>
//                 {/* Show delete button if current user is the post owner */}
//                 {currentUserId === post?.userId && (
//                   <button onClick={() => deleteComment(comment.id)}>
//                     Delete
//                   </button>
//                 )}
//               </div>
//             ))}
//           </article>
//         </section>
//       </section>
//     </section>
//   </section>
// );

