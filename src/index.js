// src/index.js
import React from "react";
import "./index.css"; 
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/Authcontext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
