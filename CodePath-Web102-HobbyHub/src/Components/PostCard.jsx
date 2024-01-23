import React from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({ userPost }) => {
  const createdDate = new Date(userPost.created_at);
  const now = new Date();
  const timeDifference = now - createdDate;

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

  const commentsCount = userPost.comments ? userPost.comments.length : 0;

  return (
    <div>
      <Link className="text-card-link" to={"/details/" + userPost.id}>
        <div className="post-card">
          <div className="posted-ago-container">
            <h4>
              <span>Posted</span> {formatTimeAgo(timeDifference)}
            </h4>
          </div>
          <div className="post-title-container">
            <h2>{userPost.title}</h2>
          </div>
          <div className="post-up-votes-container">
            <h4>
              {userPost.up_votes} <span>Upvotes</span>
            </h4>
            <h4>
              <span>|</span>
            </h4>
            <h4>
              {commentsCount} <span>Comment{commentsCount !== 1 ? "s" : ""}</span>
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
