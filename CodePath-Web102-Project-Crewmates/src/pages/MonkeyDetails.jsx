import "./MonkeyDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client"; // Import your Supabase client
import { Link } from "react-router-dom";

const MonkeyDetails = () => {
  const { id } = useParams();
  const [monkey, setMonkey] = useState(null);

  useEffect(() => {
    // Fetch the specific monkey based on the ID
    async function fetchMonkey() {
      const { data, error } = await supabase.from("Monkeys").select().eq("id", id).single();

      if (error) {
        console.error("Error fetching monkey:", error);
      } else {
        setMonkey(data);
      }
    }
    fetchMonkey();
  }, [id]);

  // Define an array of sentences for different levels
  const sentences = [
    "This monkey is just getting started.",
    "A level 2 monkey ready for action.",
    "Level 3 - This monkey is improving.",
    "This monkey is a decent competitor now!",
    "Level 5 - Great level balance.",
    "Top tier Monkey!",
    "This Monkey is now amongst the best!",
    "A well respected Monkey Level!",
    "Whoo! What a nice level!",
    "Max Level Monkey! Let's get the job done!",
    // Add more sentences as needed for higher levels.
  ];

  // Function to select a sentence based on the monkey's level
  const getLevelSentence = (level) => {
    if (level >= 1 && level <= sentences.length) {
      return sentences[level - 1];
    }
    return "This monkey's level is a mystery!";
  };

  const powerTypeImages = {
    Ninja: "/./src/Images/Monkeys/Ninja-Monkey.webp",
    Ice: "/./src/Images/Monkeys/Ice-Monkey.webp",
    Wizard: "/./src/Images/Monkeys/Wizard-Monkey.webp",
    Sniper: "/./src/Images/Monkeys/Sniper-Monkey.webp",
    Boomerang: "/./src/Images/Monkeys/Boomerang-Monkey.webp",
    Super: "/./src/Images/Monkeys/Super-Monkey.webp",
    Engineer: "/./src/Images/Monkeys/Engineer-Monkey.webp",
    Dart: "/./src/Images/Monkeys/Dart-Monkey.webp",
  };

  return (
    <div>
      <div className="main-page">
        <div className="whole-page">
          {monkey ? ( // Conditionally render if monkey data is available
            <div>
              <h1 className="squad-member-name">Squad Member Name: {monkey.name}</h1>
              <h1 className="stats">Stats:</h1>
              <h2>Power: {monkey.power_type}</h2>
              <h2>Level: {monkey.level}</h2>
              <h2 className="sentence-summary">{getLevelSentence(monkey.level)}</h2>
              <div className="button-container">
                <Link to={"/edit/" + monkey.id}>
                  <button type="button">Want to edit this Monkey?</button>
                </Link>
              </div>
              <img src={powerTypeImages[monkey.power_type]} alt={monkey.name} />
            </div>
          ) : (
            <p>Loading...</p> // Display a loading message while fetching
          )}
        </div>
      </div>
    </div>
  );
};

export default MonkeyDetails;
