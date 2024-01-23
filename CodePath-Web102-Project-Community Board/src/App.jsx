import "./App.css";
import ResourceLayout from "./components/ResourceLayout";
import ToTopButton from "./components/ToTopButton";
const App = () => {
  return (
    <div className="App">
      <div className="Header">
        <h1 className="logo">&lt;/&gt;</h1>
        <h1>Start To Code</h1>
      </div>
      <h2>Below are some of the best resources to get you started on your coding journey!</h2>
      <ResourceLayout />
      <ToTopButton />
    </div>
  );
};

export default App;
