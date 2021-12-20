import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// React DOM libary allows us to basically interact with the DOM in the browser

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
