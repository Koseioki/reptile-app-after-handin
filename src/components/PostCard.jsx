import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import UserAvatar from "./UserAvatar";
import favouriteIcon from "../images/favourite.svg";
import commentIcon from "../images/comments.svg";
import "../firebase-config"; 
// It is a me, Connor figuring out the tags, comments and likes to see if I can get them to a working state
export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const commentsRef = ref(db, `comments/${post.id}`);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      setCommentsCount(data ? Object.keys(data).length : 0);
    });

    const likesRef = ref(db, `likes/${post.id}`);
    onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      setLikesCount(data ? Object.keys(data).length : 0);
    });
  }, [post.id]);

  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article onClick={handleClick} className="post-card drop-shadow">
      <UserAvatar uid={post.uid} />
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <a href={`/posts/${post.id}/edit`}>Edit this post</a>
      <p>{post.caption}</p>
      <img src={post.image} alt={post.altText} />
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
            <img src={favouriteIcon} alt="Likes" className="icon" />{" "}
            {likesCount}
          </span>
          <span>
            <img src={commentIcon} alt="Comments" className="icon" />{" "}
            {commentsCount}
          </span>
        </div>
      </div>
    </article>
  );
}
