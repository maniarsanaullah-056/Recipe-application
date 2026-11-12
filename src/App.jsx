import { useRef, useState } from "react";
import { FiSmile } from "react-icons/fi";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Message from "./components/Message";
import RecipeDetail from "./components/RecipeDetail";
import { useRecipeSearch } from "./hooks/useRecipeSearch";
import "./styles/App.css";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const detailRef = useRef(null);
  const { recipes, status, error, retry } = useRecipeSearch(query);

  // Nayi search par purani selected recipe hata do
  const handleSearch = (text) => {
    setQuery(text);
    setSelectedId(null);
  };

  const handleSelect = (id) => {
    setSelectedId(id);

    // Mobile par list upar hoti hai, is liye detail tak scroll karo
    if (window.matchMedia("(max-width: 860px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
       <Header onSearch={handleSearch} onSelectRecipe={handleSelect} />
      <main className="app__main">
        <Sidebar
          status={status}
          recipes={recipes}
          error={error}
          selectedId={selectedId}
          onSelect={handleSelect}
          onRetry={retry}
        />

        <section className="detail" ref={detailRef}>
          {selectedId ? (
            // key lagane se har nayi recipe par component naya ban jata hai,
            // is liye servings apne aap asli value par reset ho jati hain
            <RecipeDetail key={selectedId} recipeId={selectedId} onDeleted={() => setSelectedId(null)} />
          ) : (
            <Message
              icon={<FiSmile />}
              title="Start by searching for a recipe or an ingredient. Have fun!"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;