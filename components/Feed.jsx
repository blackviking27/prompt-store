"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    // to remove the previous timeout that was set by previous character
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    // sets the new timout function that runs after 500ms
    // so that the result is not filtered on every keystroke
    setSearchTimeout(
      setTimeout(() => {
        let searchResults = filterPrompts(e.target.value);
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    let searchResults = filterPrompts(tag);
    setSearchedResults(searchResults);
  };

  const filterPrompts = (searchTerm) => {
    const regex = new RegExp(searchTerm, "i");
    // filtering the prompts based on the searchterm that is being typed
    return posts.filter(
      (item) =>
        regex.test(item.creator.userName) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or user"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
