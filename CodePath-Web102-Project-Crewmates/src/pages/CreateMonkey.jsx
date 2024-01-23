import React, { useState } from "react";
import "./CreateMonkey.css";
import { supabase } from "../client";
const CreateMonkey = () => {
  const [monkey, setMonkey] = useState({ name: "", power_type: "", level: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMonkey((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRadioChange = (event) => {
    const selectedPower = event.target.value;
    setMonkey((prev) => ({
      ...prev,
      power_type: selectedPower,
    }));
  };

  const createMonkey = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from("Monkeys")
      .insert({ name: monkey.name, power_type: monkey.power_type, level: monkey.level })
      .select();

    if (error) {
      console.log(error);
    }

    window.location = "/";
  };

  return (
    <div>
      <div className="whole-page-CM">
        <h1 className="create-title">Create a New Squad Member</h1>
        <img src="src/Images/BloonsTDImage.png" alt="Multiple Monkeys from Bloons TD" className="create-monkey-image-cm" />
        <br></br>
        <form className="form-container">
          <div className="mini-container">
            <label>
              <h3>Name:</h3>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter squad member's name"
              value={monkey.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="mini-container">
            <label>
              <h3>Level (1-10):</h3>
            </label>
            <input
              type="text"
              id="level"
              name="level"
              placeholder="Enter level from 1-10"
              value={monkey.level}
              onChange={handleChange}
            ></input>
          </div>
          <div className="mini-container">
            <label>
              <h3>Power:</h3>
            </label>
            <ul>
              <li>
                <input
                  id="Ninja"
                  name="power_type"
                  type="radio"
                  value="Ninja"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Ninja"}
                />
                Ninja
              </li>
              <li>
                <input
                  id="Ice"
                  name="power_type"
                  type="radio"
                  value="Ice"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Ice"}
                />
                Ice
              </li>
              <li>
                <input
                  id="Wizard"
                  name="power_type"
                  type="radio"
                  value="Wizard"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Wizard"}
                />
                Wizard
              </li>
              <li>
                <input
                  id="Sniper"
                  name="power_type"
                  type="radio"
                  value="Sniper"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Sniper"}
                />
                Sniper
              </li>
              <li>
                <input
                  id="Boomerang"
                  name="power_type"
                  type="radio"
                  value="Boomerang"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Boomerang"}
                />
                Boomerang
              </li>
              <li>
                <input
                  id="Super"
                  name="power_type"
                  type="radio"
                  value="Super"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Super"}
                />
                Super
              </li>
              <li>
                <input
                  id="Engineer"
                  name="power_type"
                  type="radio"
                  value="Engineer"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Engineer"}
                />
                Engineer
              </li>
              <li>
                <input
                  id="Dart"
                  name="power_type"
                  type="radio"
                  value="Dart"
                  onChange={handleRadioChange}
                  checked={monkey.power_type === "Dart"}
                />
                Dart
              </li>
            </ul>
          </div>
        </form>
        <button type="submit" value="Submit" onClick={createMonkey}>
          Create Monkey
        </button>
      </div>
    </div>
  );
};

export default CreateMonkey;
