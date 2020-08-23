import React from "react";
import ReactDOM from "react-dom";

// IMPORT APP
import AppWithRouter from "./components/app/App";

// IMPORT STYLES
import "./sass/main.scss";

ReactDOM.render(<AppWithRouter />, document.querySelector("#root"));