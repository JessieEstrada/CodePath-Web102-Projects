import React from "react";
import "./MonkeyCard.css";
import { Link } from "react-router-dom";

const MonkeyCard = ({ monkey }) => {
  const powerTypeImages = {
    Ninja: "src/Images/Monkeys/Ninja-Monkey.webp",
    Ice: "src/Images/Monkeys/Ice-Monkey.webp",
    Wizard: "src/Images/Monkeys/Wizard-Monkey.webp",
    Sniper: "src/Images/Monkeys/Sniper-Monkey.webp",
    Boomerang: "src/Images/Monkeys/Boomerang-Monkey.webp",
    Super: "src/Images/Monkeys/Super-Monkey.webp",
    Engineer: "src/Images/Monkeys/Engineer-Monkey.webp",
    Dart: "src/Images/Monkeys/Dart-Monkey.webp",
  };
  return (
    <div>
      <div className="monkey-card">
        <img src={powerTypeImages[monkey.power_type]} alt={monkey.name} className="single-monkey-member" />
        <div className="button-container">
          <Link to={"/details/" + monkey.id}>
            <button type="button">View Monkey</button>
          </Link>
        </div>
        <h3>
          Name of Monkey:
          <span> {monkey.name}</span>
        </h3>
        <h3>
          Monkey Level:
          <span> {monkey.level}</span>
        </h3>
        <h3>
          Monkey Power:
          <span> {monkey.power_type}</span>
        </h3>
        <div className="button-container">
          <Link to={"/edit/" + monkey.id}>
            <button type="button">Edit Monkey</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MonkeyCard;
