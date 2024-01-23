import React from "react";
import "/./src/App.css";
const MainPage = () => {
  return (
    <div className="main-page">
      <div className="whole-page">
        <h1>Welcome to the Monkey Squad Creator!</h1>
        <h3 className="web-description">
          Here is where you will strategically assemble your Monkey squad to take down those vicious 'Bloons.'
        </h3>
        <img src="src/Images/BloonsTDImage.png" alt="Multiple Monkeys from Bloons TD" className="welcome-images" />
        <br></br>
        <img src="src/Images/BloonsMOABImage.webp" alt="Purple MOAB from Bloons TD" className="welcome-images" />
      </div>
    </div>
  );
};
export default MainPage;
