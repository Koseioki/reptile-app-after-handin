import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import CommentForm from "../components/CommentForm";

// Kosei: post detail page for comments
export default function PostDetailPage() {

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

    return (
        <section className="page">
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
                                    <p>{Date(comment.createdAt)}</p>
                                    <p>{comment.comment}</p>

                                </div>
                            ))}


                        </article>

                    </section>

                </section>
            </section>
        </section>
    )
}
