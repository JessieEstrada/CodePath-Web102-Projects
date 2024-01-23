import React from "react";

const ResourceCard = (props) => {
  return (
    <div className="Card">
      <img src={props.imageUrl} alt={props.name} />
      <h3>{props.name}</h3>
      <h5>{props.description}</h5>
      <a href={props.link}>
        <button>View Resource</button>
      </a>
      <h4>{props.cost}</h4>
    </div>
  );
};
export default ResourceCard;
