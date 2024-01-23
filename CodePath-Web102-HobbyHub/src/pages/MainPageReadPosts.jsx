import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import PostCard from "../Components/PostCard";
import "./MainPageReadPosts.css";

const MainPageReadPosts = ({ userPostsData, searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchUserPosts = async () => {
    let { data, error } = await supabase.from("Posts").select();

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      // Filter posts based on search term in title
      data = data.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

      // Sort the posts based on the selected order
      if (sortOrder === "newest") {
        data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortOrder === "mostPopular") {
        data = data.sort((a, b) => b.up_votes - a.up_votes);
      }

      setPosts(data);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [sortOrder, searchTerm]);

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          <div className="order-section">
            <h4>Order by:</h4>
            <button className="order-button" onClick={() => handleSortOrderChange("newest")}>
              Newest
            </button>
            <button className="order-button" onClick={() => handleSortOrderChange("mostPopular")}>
              Most Popular
            </button>
          </div>
          <div className="post-squad-container">
            {posts.length === 0 ? (
              <h2>Your have no posts!</h2>
            ) : (
              posts.map((userPost) => <PostCard key={userPost.id} userPost={userPost} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageReadPosts;
