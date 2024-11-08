// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../firebase-config";
import UserAvatar from "./UserAvatar";
// import favouriteIcon from "../images/favourite.svg";
import commentIcon from "../images/comments.svg";
import "../firebase-config";
import LikeButton from "./LikeButton";


// It is a me, Connor figuring out the tags, comments and likes to see if I can get them to a working state
export default function PostCard({ post }) {
  const navigate = useNavigate();
  // const [commentsCount, setCommentsCount] = useState(0);
  // const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
  // const [likesCount, setLikesCount] = useState(0);

  // Kosei: comment counting (actually we didn't have to use a whole new function for this)
  const commentsCount = post.comments ? Object.keys(post.comments).length : 0;
  // useEffect(() => {
  //   const db = getDatabase();
  //   const commentsRef = ref(db, `comments/${post.id}`);
  //   onValue(commentsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setCommentsCount(data ? Object.keys(data).length : 0);
  //   });

  // const likesRef = ref(db, `likes/${post.id}`);
  // onValue(likesRef, (snapshot) => {
  //   const data = snapshot.val();
  //   setLikesCount(data ? Object.keys(data).length : 0);
  // });
  // }, [post.id]);


  // this is the user id of the logged in user
  const yourUserId = auth.currentUser?.uid;
  // console.log(auth.currentUser?.uid)

  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article className="post-card drop-shadow">
      <UserAvatar uid={post.uid} />

      {/* Kosei: this is the part actually clickable */}
      <div onClick={handleClick}>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        <a href={`/posts/${post.id}/edit`}>Edit this post</a>
        <p>{post.caption}</p>
        <img className="post-image" src={post.image} alt={post.altText} />
      </div>
      {/* Kosei: this is the part that is not clickable */}
      <div className="post-footer">
        <div className="hashtags">
          {post.tags && post.tags.length > 0 ? ( //i figured shit out (Connor) it shows! Testngcomment
            post.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))
          ) : (
            <span className="tag">#NoTags</span>
          )}
        </div>
        <div className="post-stats">
          <span>
            {/* <img src={favouriteIcon} alt="Likes" className="icon" />{" "}
            {likesCount} */}
            <LikeButton post={post} yourUserId={yourUserId} />
          </span>
          <span>
            <img onClick={handleClick} src={commentIcon} alt="Comments" className="icon" />{" "}
            {commentsCount}
          </span>
        </div>
      </div>

    </article>
  );
}
