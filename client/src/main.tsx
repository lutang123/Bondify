import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";

// Extend window for types
declare global {
  interface Window {
    REPLIT_DOMAINS?: string;
  }
}

// Setup Motion with AnimatePresence for page transitions
const AppWithAnimation = () => (
  <AnimatePresence mode="wait">
    <App />
  </AnimatePresence>
);

createRoot(document.getElementById("root")!).render(<AppWithAnimation />);
