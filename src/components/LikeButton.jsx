// Kosei: Like button (countable)

import { useState } from "react";
import favouriteIcon from "../images/favourite.svg";
import favouriteIconFilled from "../images/favourite-filled.svg";

// yourUserId is the user id of logged in user
export default function LikeButton({ post, yourUserId }) {
    // the array of likes (IDs and true/false)
    // console.log(post.likes)
    // the ID of you (logged in user)
    // console.log(yourUserId)

    // count how many objects post.likes has
    const initialLikeCount = post.likes ? Object.keys(post.likes).length : 0;

    // see if {post.likes} has {yourUserId} in it
    const [isLiked, setIsLiked] = useState(!!post.likes && post.likes.hasOwnProperty(yourUserId));
    // console.log(isLiked + " " + post.caption)

    // count how many likes the post has and keep track of it in state
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    // Kosei: dynamic favourite icon
    // if {isLiked} is true, use favouriteIconFilled, otherwise use favouriteIcon
    const heart = isLiked ? favouriteIconFilled : favouriteIcon;

    async function handleLike() {
        const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${post.id}.json`;
        
        // Create a clone of the existing likes object to avoid overwriting others' likes
        const updatedLikes = { ...post.likes };

        if (!isLiked) {
            // console.log("is not liked");
            // add yourUserId to post.likes (True)
            updatedLikes[yourUserId] = true; // Store as boolean `true`
            setLikeCount(prevCount => prevCount + 1);
            setIsLiked(true);
        } else {
            // console.log("is liked");
            // remove yourUserId from post.likes
            delete updatedLikes[yourUserId];
            setLikeCount(prevCount => Math.max(prevCount - 1, 0));
            setIsLiked(false);
        }

        // Send updated likes to the server
        try {
            await fetch(url, {
                method: "PATCH",
                body: JSON.stringify({ likes: updatedLikes }),
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    }

    return (
        <span
        onClick={handleLike}
        tabIndex="0"

        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleLike();
          }
        }}
        style={{ cursor: "pointer" }}>
            <img
                src={heart}
                className="icon"
                alt="likes"
            />
            {likeCount}
        </span>
    );
}



// import { useState } from "react";
// import favouriteIcon from "../images/favourite.svg";
// import favouriteIconFilled from "../images/favourite-filled.svg";

// // yourUserId is the user id of logged in user
// export default function LikeButton({ post, yourUserId }) {
//     // the array of likes (IDs and true/false)
//     // console.log(post.likes)
//     // the ID of you (logged in user)
//     // console.log(yourUserId)


//     // count how many objects post.likes has
//     const likeCount = post.likes ? Object.keys(post.likes).length : 0;

//     // see if {post.likes} has {yourUserId} in it
//     // has got error in hasOwnProperty but I don't know what to do with it
//     const [isLiked, setIsLiked] = useState(!!post.likes && post.likes.hasOwnProperty(yourUserId));
//     // console.log(isLiked + " " + post.caption)

//     // Kosei: dynamic favourite icon
//     // if {isLiked} is true, use favouriteIconFilled, otherwise use favouriteIcon
//     const heart = isLiked ? favouriteIconFilled : favouriteIcon;


//     async function handleLike() {
//         // console.log("liked");
//         const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts/${post.id}.json`;
//         // console.log(url);
//         if (!isLiked) {
//             console.log("is not liked")
//             // add yourUserId to post.likes (True)
//             const response = await fetch(url, {
//                 method: "PATCH",
//                 body: JSON.stringify({
//                     likes: {
//                         [yourUserId]: "True",
//                     },
//                 }),

//             }
//             );
//             } else {
//                 console.log("is liked")
//                 // remove yourUserId from post.likes
//                 const response = await fetch(url, {
//                     method: "PATCH",
//                     body: JSON.stringify({
//                         likes: {
//                             [yourUserId]: null,
//                         },
//                     }),
//                 }
//                 );


//         }
//     }

//     return (
//         <span onClick={handleLike} style={{ cursor: "pointer" }}>
//             <img
//                 src={heart}
//                 className="icon"
//                 alt="likes"
//             />
//             {likeCount}
//         </span>
//     )
// }