import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import ReadMonkeys from "./pages/ReadMonkeys";
import CreateMonkey from "./pages/CreateMonkey";
import MainPage from "./pages/MainPage";
import EditMonkey from "./pages/EditMonkey";
import MonkeyDetails from "./pages/MonkeyDetails";
import { Link } from "react-router-dom";
import { supabase } from "./client";

function App() {
  const [monkeyData, setMonkeyData] = useState([]);

  const fetchMonkeys = async () => {
    const { data, error } = await supabase.from("Monkeys").select();
    if (error) {
      console.error("Error fetching monkeys:", error);
    } else {
      // Set the retrieved data to the state variable monkeyData
      setMonkeyData(data);
    }
  };

  useEffect(() => {
    fetchMonkeys();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/gallery", // Change the path to include "*"
      element: <ReadMonkeys />,
    },
    {
      path: "/create",
      element: <CreateMonkey />,
    },
    {
      path: "/edit/:id",
      element: <EditMonkey data={monkeyData} />, // Pass monkeyData as a prop
    },
    {
      path: "/details/:id",
      element: <MonkeyDetails data={monkeyData} />, // Pass monkeyData as a prop
    },
  ]);

  return (
    <div className="App">
      <div className="sidenav">
        <Link to="/">
          <p className="sidenav-link">Home</p>
        </Link>
        <Link to="/create">
          <p className="sidenav-link">Create a Monkey</p>
        </Link>
        <Link to="/gallery">
          <p className="sidenav-link">Squad Gallery</p>
        </Link>
        <img src="/./src/Images/StationaryImageMonkey.gif" alt="Dart Monkey from Bloons TD" className="sidenav-single-monkey" />
      </div>
      {element}
    </div>
  );
}

export default App;
