//Kosei
import { useState } from "react";
import { auth } from "../firebase-config";

// {postId} is the ID of the post that the comment is being added to
export default function CommentForm({postId}) {
    // console.log(postId);
    const [comment, setComment] = useState("");
    async function postComment(newComment) {
        newComment.userId = auth.currentUser.uid;
        newComment.postId = postId;
        newComment.createdAt = Date.now();
        // add comment to the comment tree
        const commentUrl="https://reptile-app-ebad6-default-rtdb.firebaseio.com/comments.json";

        const response = await fetch(commentUrl, {
            method: "POST",
            body: JSON.stringify(newComment)
        });



        if (response.ok) {
            const data = await response.json();
            console.log("New comment created: ", data);
            const commentId = data.name;

            console.log("thisis the data.naeme" + data.name);
            // URL to add the comment reference to the specific post in the post tree
            const postUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${postId}/comments.json`;

            // Add the reference of the comment to the post's comments list
            await fetch(postUrl, {
                method: "PATCH",
                body: JSON.stringify({ [commentId]: "true" }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // Kosei: Reload the page to show the new comment

            window.location.reload();

        } else {
            console.log("Sorry, something went wrong");
        }
    }




    function handleSubmit(event) {
        event.preventDefault();
        // console.log(comment);
        postComment({comment});
    }
    // console.log({postId});

    return (
        <form className="comment-form">
      <label htmlFor="comment">Comment</label>
      <input
        id="comment"
        name="comment"
        type="text"
        value={comment}
        aria-label="comment"
        placeholder="Write a comment..."
        onChange={e => setComment(e.target.value)}
        
      />
        <button onClick={handleSubmit}>Add a comment</button>
        </form>
    );
}