import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import general styles if you have them
import App from "./App"; // Import the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This mounts the App component to the div in index.html
);
