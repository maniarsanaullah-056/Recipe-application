import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { MyRecipesProvider } from "./context/MyRecipesContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MyRecipesProvider>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </MyRecipesProvider>
    </ThemeProvider>
  </StrictMode>
);