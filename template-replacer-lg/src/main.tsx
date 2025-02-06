import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-gray-200 min-h-screen">
      <Router />
    </div>
  </StrictMode>
);
