import React from "react";
import ResourceCard from "./ResourceCard";
const ResourceLayout = () => {
  return (
    <>
      <div className="Container">
        <ResourceCard
          imageUrl="./src/Images/code-academy-icon.png"
          name="Codecademy"
          description="Hands on interactive coding courses."
          link="https://www.codecademy.com"
          cost="Free & Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/free-code-camp.jpg"
          name="freeCodeCamp"
          description="Hands on coding courses and video tutorials."
          link="https://www.freecodecamp.org"
          cost="Free"
        />
        <ResourceCard
          imageUrl="./src/Images/w3Schools-icon.png"
          name="W3Schools"
          description="Web development tutorials and dictionary for various languages."
          link="https://www.w3schools.com"
          cost="Free & Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/LinkedIn-Learning-icon.png"
          name="LinkedIn Learning"
          description="Video courses taught by industry professionals."
          link="https://www.linkedin.com/learning/"
          cost="Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/Bro-Code-icon.jpg"
          name="Bro Code"
          description="YouTube video tutorials for various languages and technologies."
          link="https://www.youtube.com/@BroCodez"
          cost="Free"
        />
        <ResourceCard
          imageUrl="./src/Images/code-wars-icon.png"
          name="Codewars"
          description="Develop your skills through various coding challenges."
          link="https://www.codewars.com"
          cost="Free"
        />
        <ResourceCard
          imageUrl="./src/Images/dev-roadmaps-icon.png"
          name="Developer Roadmaps"
          description="Fantastic roadmaps to help you on your coding journey!"
          link="https://roadmap.sh"
          cost="Free"
        />
        <ResourceCard
          imageUrl="./src/Images/leet-code-icon.png"
          name="LeetCode"
          description="Coding challenges and technical interview preparation."
          link="https://leetcode.com"
          cost="Free & Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/odin-projcet-icon.png"
          name="The Odin Project"
          description="Hands on interactive coding courses for Web Development."
          link="https://www.theodinproject.com"
          cost="Free & Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/coursera-icon.png"
          name="Coursera"
          description="Online courses, certifications, and degrees for various technology topics."
          link="https://www.coursera.org"
          cost="Free & Paid"
        />
        <ResourceCard
          imageUrl="./src/Images/mit-oopencourseware-icon.jpeg"
          name="MIT OpenCourseWare"
          description="MIT educational material available online."
          link="https://ocw.mit.edu"
          cost="Free"
        />
        <ResourceCard
          imageUrl="./src/Images/g-for-g-icon.jpg"
          name="GeeksforGeeks"
          description="Computer science and programming articles and documentation."
          link="https://www.geeksforgeeks.org"
          cost="Free & Paid"
        />
      </div>
    </>
  );
};

export default ResourceLayout;
