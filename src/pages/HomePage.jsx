import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import NewReptileOwnerPopup from "../components/NewReptileOwnerPopup";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const url =
        "https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts.json";
      const response = await fetch(url);
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  return (
    <section className="page">
      <h1>Home</h1>
      <NewReptileOwnerPopup />
      {/* Kosei: put timeline-container outside of timeline to centre the content */}
      <section className="timeline-container">
        <section className="timeline">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
      </section>
    </section>
  );
}
