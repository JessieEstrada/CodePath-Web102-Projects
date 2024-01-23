import React, { useState, useEffect } from "react";
import MonkeyCard from "/src/Components/MonkeyCard.jsx";
import { supabase } from "../client";

const ReadMonkeys = (props) => {
  // Declare the state variable posts and a function to update it
  const [posts, setPosts] = useState([]);

  const fetchMonkeys = async () => {
    const { data, error } = await supabase.from("Monkeys").select();
    if (error) {
      console.error("Error fetching monkeys:", error);
    } else {
      // Set the retrieved data to the state variable posts
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchMonkeys();
  }, []);

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          <div className="monkey-squad-container">
            <h1>Your Monkey Squad Gallery!</h1>
            {posts.length === 0 ? (
              <h2>Your squad is currently empty!</h2>
            ) : (
              posts.map((monkey) => <MonkeyCard key={monkey.id} monkey={monkey} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadMonkeys;
