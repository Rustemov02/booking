import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "rsuite/dist/rsuite.min.css";
import "./index.css";
import App from "./app";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
