import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./EditPost.css";
const EditPost = () => {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    up_votes: "",
    comments: "",
  });

  useEffect(() => {
    // Fetch the specific post based on the ID
    async function fetchPost() {
      const { data, error } = await supabase.from("Posts").select().eq("id", id).single(); // Assuming 'id' is unique, so use 'single' to get one record

      if (error) {
        console.error("Error fetching Post:", error);
      } else {
        setUserPost(data);
        setFormData({
          title: data.title,
          content: data.content,
          image_url: data.image_url,
        });
      }
    }

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("title");

    if (titleInput.value.trim() === "") {
      // Display a window or message if the title is missing
      alert("Title is mandatory. Please enter a title.");
    } else {
      // Update the post data in Supabase
      const { data, error } = await supabase
        .from("Posts")
        .update({
          title: formData.title,
          content: formData.content,
          image_url: formData.image_url,
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating Post:", error);
      } else {
        // Display a confirmation message to the user
        window.alert("Post updated.");
        // Reload the page
        window.location.href = `/`;
      }
    }
    return;
  };

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          <div className="form-div">
            <img className="edit-post-img" src={formData.image_url}></img>
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="title-input-div">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder={formData.title ? "Title" : ""}
                  onChange={handleInputChange}
                  className="title-input-field"
                  required
                ></input>
              </div>
              <div className="content-input-div">
                <textarea
                  type="textarea"
                  id="content"
                  name="content"
                  value={formData.content}
                  placeholder={formData.content ? "Content" : ""}
                  onChange={handleInputChange}
                  className="content-input-field"
                ></textarea>
              </div>
              <div className="image-url-div">
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  placeholder={formData.image_url ? "URL" : ""}
                  onChange={handleInputChange}
                  className="image-url-input-field"
                ></input>
              </div>
            </form>
            <button className="submit-button" type="submit" value="Submit" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
