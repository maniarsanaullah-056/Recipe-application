import { createContext, useContext, useEffect, useState } from "react";

const MyRecipesContext = createContext();
const STORAGE_KEY = "fk-my-recipes";

// Meri recipes ki id "my-" se shuru hoti hai, taake API ki id se alag pehchani jayen
const ID_PREFIX = "my-";
export const isMyRecipeId = (id) =>
  typeof id === "string" && id.startsWith(ID_PREFIX);

const loadRecipes = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export function MyRecipesProvider({ children }) {
  const [myRecipes, setMyRecipes] = useState(loadRecipes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myRecipes));
  }, [myRecipes]);

  // Nayi recipe save karo aur uski id wapas do
  const addRecipe = (data) => {
    const id = `${ID_PREFIX}${Date.now()}`;
    setMyRecipes((prev) => [{ id, ...data }, ...prev]);
    return id;
  };

  const getMyRecipe = (id) => myRecipes.find((r) => r.id === id);

  const deleteRecipe = (id) =>
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));

  return (
    <MyRecipesContext.Provider
      value={{ myRecipes, addRecipe, getMyRecipe, deleteRecipe }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export const useMyRecipes = () => useContext(MyRecipesContext);