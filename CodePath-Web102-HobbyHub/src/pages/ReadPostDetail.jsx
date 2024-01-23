import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client"; // Import your Supabase client
import { Link } from "react-router-dom";
import "./ReadPostDetail.css";

const ReadPostDetail = () => {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the specific Post based on the ID
    async function fetchUserPost() {
      const { data, error } = await supabase.from("Posts").select().eq("id", id).single();

      if (error) {
        console.error("Error fetching Post:", error);
      } else {
        setUserPost(data);

        // Assuming 'comments' is an array of JSON objects in your Supabase column
        setComments(data.comments || []);
      }
    }
    fetchUserPost();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    // Add the new comment to the 'comments' array
    const commentInput = document.getElementById("commentAdded");

    if (commentInput.value.trim() === "") {
      // Display a window or message if the title is missing
      alert("Cannot post a blank comment.");
    } else {
      const updatedComments = [...comments, { text: newComment, timestamp: new Date() }];

      // Update the 'comments' column in the database
      const { error } = await supabase.from("Posts").update({ comments: updatedComments }).eq("id", id);

      if (error) {
        console.error("Error adding comment:", error);
      } else {
        // Update the local state with the new comments
        setComments(updatedComments);
        setNewComment(""); // Clear the comment input field
      }
    }
  };

  const handleUpvote = async () => {
    // Update the local state with the new upvote count
    const updatedUpvotes = userPost.up_votes + 1;
    setUserPost({ ...userPost, up_votes: updatedUpvotes });

    // Update the 'up_votes' column in the database
    const { error } = await supabase.from("Posts").update({ up_votes: updatedUpvotes }).eq("id", id);

    if (error) {
      console.error("Error updating upvotes:", error);
    }
  };

  const formatTimeAgo = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    console.log("Delete button clicked");

    // Delete the Post data in Supabase
    const { error } = await supabase.from("Posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting Post:", error);
    } else {
      window.alert("Post deleted.");
      // Redirect to the gallery after successful deletion
      window.location.href = "/";
    }

    // Add a return statement here to prevent further execution of code
    return;
  };

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          {userPost ? (
            <div className="post-card-full">
              <div className="posted-ago-container">
                <h4>
                  <span>Posted</span> {formatTimeAgo(new Date() - new Date(userPost.created_at))}
                </h4>
              </div>
              <div className="post-title-container-detail">
                <h2>{userPost.title}</h2>
              </div>
              <div className="image-actions-container">
                <div className="post-image-container">
                  <img className="post-image" src={userPost.image_url} alt={userPost.name} />
                </div>
                <div className="post-up-votes-container">
                  <div className="up-votes-container">
                    <button className="icon" onClick={handleUpvote}>
                      👍🏼
                    </button>
                    <h4 className="amount-upvotes">
                      {userPost.up_votes} <span>upvotes</span>
                    </h4>
                  </div>
                  <div className="actions-container">
                    <Link to={"/edit/" + userPost.id}>
                      <button className="icon">✏️</button>
                    </Link>
                    <button className="icon" onClick={handleDelete}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
              <div className="post-content-container">
                <textarea className="content-textarea" readOnly value={userPost.content}></textarea>
              </div>
              <div className="comments-container">
                <h2>Comments</h2>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                  ))}
                </ul>
                <div className="submit-comment-section">
                  <textarea
                    className="comment-text-area"
                    id="commentAdded"
                    value={newComment}
                    placeholder="Leave a comment..."
                    onChange={handleCommentChange}
                  ></textarea>
                  <button onClick={handleAddComment}>Post</button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadPostDetail;
