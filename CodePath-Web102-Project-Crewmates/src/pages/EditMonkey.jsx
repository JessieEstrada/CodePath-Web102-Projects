import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditMonkey.css";
import { supabase } from "../client"; // Import your Supabase client

const EditMonkey = () => {
  const { id } = useParams();
  const [monkey, setMonkey] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    power_type: "",
  });

  useEffect(() => {
    // Fetch the specific monkey based on the ID
    async function fetchMonkey() {
      const { data, error } = await supabase.from("Monkeys").select().eq("id", id).single(); // Assuming 'id' is unique, so use 'single' to get one record

      if (error) {
        console.error("Error fetching monkey:", error);
      } else {
        setMonkey(data);
        setFormData({
          name: data.name,
          level: data.level,
          power_type: data.power_type,
        });
      }
    }

    fetchMonkey();
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

    // Update the monkey data in Supabase
    const { data, error } = await supabase
      .from("Monkeys")
      .update({
        name: formData.name,
        level: formData.level,
        power_type: formData.power_type,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating monkey:", error);
    } else {
      // Display a confirmation message to the user
      window.alert("Monkey updated.");
      // Reload the page
      window.location.href = `/edit/${id}`;
    }
    return;
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Stop event propagation
    console.log("Delete button clicked");

    // Delete the monkey data in Supabase
    const { error } = await supabase.from("Monkeys").delete().eq("id", id);

    if (error) {
      console.error("Error deleting monkey:", error);
    } else {
      window.alert("Monkey deleted.");
      // Redirect to the gallery after successful deletion
      window.location.href = "/gallery";
    }

    // Add a return statement here to prevent further execution of code
    return;
  };

  if (!monkey) {
    // Handle the case when monkey data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="whole-page-cm">
        <h1>Update Your Monkey</h1>
        <img className="edit-screen-monkeys-image" src="../src/Images/BloonsTDImage.png" />
        <h2>Current Crewmate Info:</h2>
        <h2>
          Name: {monkey.name}, Power: {monkey.power_type}, Level: {monkey.level}
        </h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="mini-container">
            <label>
              <h3>Name:</h3>
            </label>
            <input
              type="text"
              name="name"
              placeholder={formData.name ? "Enter squad member's name" : ""}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="mini-container">
            <label>
              <h3>Level (1-10):</h3>
            </label>
            <input
              type="text"
              name="level"
              placeholder={formData.level ? "Enter level from 1-10" : ""}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="mini-container">
            <label>
              <h3>Power:</h3>
            </label>
            <ul>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Ninja"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Ninja"}
                />
                Ninja
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Ice"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Ice"}
                />
                Ice
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Wizard"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Wizard"}
                />
                Wizard
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Sniper"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Sniper"}
                />
                Sniper
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Boomerang"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Boomerang"}
                />
                Boomerang
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Super"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Super"}
                />
                Super
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Engineer"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Engineer"}
                />
                Engineer
              </li>
              <li>
                <input
                  type="radio"
                  name="power_type"
                  value="Dart"
                  onChange={handleInputChange}
                  checked={formData.power_type === "Dart"}
                />
                Dart
              </li>
            </ul>
          </div>
        </form>
        <button type="submit" onClick={handleSubmit}>
          UPDATE MONKEY
        </button>
        <button onClick={handleDelete}>DELETE MONKEY</button>
      </div>
    </div>
  );
};

export default EditMonkey;
