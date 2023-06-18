import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./Index.css";

const app = document.getElementById("app");
if (app === null) {
  throw new Error(`#app not found.`);
}

createRoot(app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
