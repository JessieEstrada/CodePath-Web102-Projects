import React, { useState } from "react";

const Flashcard = (props) => {
  const handleFlipCard = () => {
    props.setIsFlipped(!props.isFlipped); // Toggle the flipped state
  };

  return (
    <div className={`Card ${props.isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
      <div className="card-inner">
        <div className={`front ${props.isFlipped ? "hidden" : ""}`}>
          <p>{props.question}</p>
        </div>
        <div className={`back ${props.isFlipped ? "" : "hidden"}`}>
          <p>{props.answer}</p>
          <img className="Answer-Picture" src={props.image}></img>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
