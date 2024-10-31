import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import NewReptileOwnerPopup from "../components/NewReptileOwnerPopup";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
      setFilteredPosts(postsArray);
    }
    getPosts();
  }, []);

  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.caption.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <section className="page">
      <h1>Home</h1>
      <SearchBar onSearch={handleSearch} />
      <NewReptileOwnerPopup />
      <section className="timeline-container">
        <section className="timeline">
          {filteredPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </section>
      </section>
    </section>
  );
}
