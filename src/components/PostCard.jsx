import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import favouriteIcon from "../images/favourite.svg";
import commentIcon from "../images/comments.svg";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article onClick={handleClick} className="post-card drop-shadow">
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.caption} />
      <h3>{post.caption}</h3>
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
            {post.likesCount}
          </span>
          <span>
            <img src={commentIcon} alt="Comments" className="icon" />{" "}
            {post.commentsCount}
          </span>
        </div>
      </div>
    </article>
  );
}
