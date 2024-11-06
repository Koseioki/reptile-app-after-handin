// HomePage.js
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import NewReptileOwnerPopup from "../components/NewReptileOwnerPopup";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter"; // Ensure this is the correct import path

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // State variables for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [reptileFilter, setReptileFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);

  // Options for the filters
  const reptileOptions = [
    { value: "Frog", label: "Frog" },
    { value: "Snake", label: "Snake" },
    { value: "Lizard", label: "Lizard" },
    { value: "Gecko", label: "Gecko" },
    { value: "Users I follow", label: "Users I follow" },
  ];

  const tagOptions = [
    { value: "wild", label: "Wild" },
    { value: "pet", label: "Pet" },
    { value: "dangerous", label: "Dangerous" },
    { value: "colorful", label: "Colorful" },
    { value: "green", label: "Green" },
  ];

  useEffect(() => {
    async function getPosts() {
      const url =
        "https://reptile-app-ebad6-default-rtdb.firebaseio.com/posts.json";
      const response = await fetch(url);
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // Convert object to array
      setPosts(postsArray);
      setFilteredPosts(postsArray);
    }
    getPosts();
  }, []);

  // Update filteredPosts whenever filters or search query change
  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, reptileFilter, tagFilter]);

  const filterPosts = () => {
    const filtered = posts.filter((post) => {
      const matchesSearch = searchQuery
        ? post.caption.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesReptileFilter = reptileFilter
        ? post.reptileType === reptileFilter.value
        : true;
      const matchesTagFilter = tagFilter
        ? post.tags.includes(tagFilter.value)
        : true;
      return matchesSearch && matchesReptileFilter && matchesTagFilter;
    });
    setFilteredPosts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const onReptileFilterChange = (selectedOption) => {
    setReptileFilter(selectedOption);
  };

  const onTagFilterChange = (selectedOption) => {
    setTagFilter(selectedOption);
  };

  return (
    <section className="page" id="main-content">
      <h1>Home</h1>
      <SearchBar onSearch={handleSearch} />
      <Filter
        label="Posts Filter"
        options={reptileOptions}
        onFilterChange={onReptileFilterChange}
      />
      <Filter
        label="Tags Filter"
        options={tagOptions}
        onFilterChange={onTagFilterChange}
      />
      <NewReptileOwnerPopup />
      <section className="timeline-container">
        <section className="timeline">
          {/* {filteredPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))} */}
          {filteredPosts
  .slice()
  .sort((a, b) => b.createdAt - a.createdAt)
  .map((post) => (
    <PostCard post={post} key={post.id} />
  ))}
        </section>
      </section>
      {/* FeedbackForm has been moved to InfoPage */}
    </section>
  );
}
