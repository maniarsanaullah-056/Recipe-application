import { FiSearch, FiFrown, FiAlertTriangle } from "react-icons/fi";
import Loader from "./Loader";
import Message from "./Message";
import RecipeList from "./RecipeList";
import "../styles/Sidebar.css";

function Sidebar({ status, recipes, error, selectedId, onSelect, onRetry }) {
  return (
    <aside className="sidebar">
      {status === "idle" && (
        <Message
          icon={<FiSearch />}
          title="Recipes yahan dikhengi"
          text="Upar search bar mein koi recipe ya ingredient likho."
        />
      )}

      {status === "loading" && <Loader />}

      {status === "empty" && (
        <Message
          icon={<FiFrown />}
          title="Koi recipe nahi mili"
          text="Kisi aur naam se try karo, jaise pizza, pasta ya burger."
        />
      )}

      {status === "error" && (
        <Message
          icon={<FiAlertTriangle />}
          title="Kuch masla ho gaya"
          text={error}
          actionLabel="Dobara try karo"
          onAction={onRetry}
        />
      )}

      {status === "success" && (
        <RecipeList
          recipes={recipes}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      )}
    </aside>
  );
}

export default Sidebar;