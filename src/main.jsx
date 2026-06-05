import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./forms.css";
import "./premium.css";
import "./coastal.css";
import "./restaurant.css";
import "./visual-menu.css";
import "./menu-ratio.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
