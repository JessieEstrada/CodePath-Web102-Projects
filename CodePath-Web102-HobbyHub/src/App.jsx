import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import { supabase } from "./client";
import MainPageReadPosts from "./pages/MainPageReadPosts";
import CreatePost from "./pages/CreatePost";
import ReadPostDetail from "./pages/ReadPostDetail";
import EditPost from "./pages/EditPost";
import pageLogo from "/./src/Images/Liga-MX-Logo.png";

function App() {
  const [userPostsData, setUserPostsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUserPosts = async () => {
    const { data, error } = await supabase.from("Posts").select();
    if (error) {
      console.error("Error fetching Posts:", error);
    } else {
      // Set the retrieved data to the state variable userPostsData
      setUserPostsData(data);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <MainPageReadPosts userPostsData={userPostsData} searchTerm={searchTerm} />,
    },
    {
      path: "/create",
      element: <CreatePost />,
    },
    {
      path: "/edit/:id",
      element: <EditPost data={userPostsData} />,
    },
    {
      path: "/details/:id",
      element: <ReadPostDetail data={userPostsData} />,
    },
  ]);

  return (
    <div className="App">
      <div className="navbar">
        <img src={pageLogo} alt="Liga MX Logo" className="navbar-liga-mx-logo" />
        <div className="title">Liga MX Lounge</div>
        <div className="search-bar">
          <input
            className="search-textbox"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="links">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/create">
            <p>Create New Post</p>
          </Link>
        </div>
      </div>
      <div className="content">{element}</div>
    </div>
  );
}

export default App;
