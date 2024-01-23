import React, { useState } from "react";
import { supabase } from "../client";
import "./CreatePost.css"; // change this after
const CreatePost = () => {
  const [post, setPost] = useState({ title: "", content: "", image_url: "", up_votes: "", comments: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title");

    if (titleInput.value.trim() === "") {
      // Display a window or message if the title is missing
      alert("Title is mandatory. Please enter a title.");
    } else {
      // Title is not missing, proceed to create the post
      const { error } = await supabase
        .from("Posts")
        .insert({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
        })
        .select();

      if (error) {
        console.log(error);
      }

      window.location = "/";
    }
  };

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          <div className="form-div">
            <form className="form-container">
              <div className="title-input-div">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={post.title}
                  onChange={handleChange}
                  className="title-input-field"
                  required
                ></input>
              </div>
              <div className="content-input-div">
                <textarea
                  type="textarea"
                  id="content"
                  name="content"
                  placeholder="Content"
                  value={post.content}
                  onChange={handleChange}
                  className="content-input-field"
                ></textarea>
              </div>
              <div className="image-url-div">
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  placeholder="URL"
                  value={post.image_url}
                  onChange={handleChange}
                  className="image-url-input-field"
                ></input>
              </div>
            </form>
            <div className="button-div">
              <button className="submit-button" type="submit" value="Submit" onClick={createPost}>
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
