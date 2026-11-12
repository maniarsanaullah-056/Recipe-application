const BASE_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";

// Recipes search karne ke liye (e.g. "pizza", "pasta")
export const searchRecipes = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${encodeURIComponent(query)}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Recipes load nahi ho sakin");
  }

  return data.data.recipes;
};

// Ek single recipe ki poori detail id se laane ke liye
export const getRecipeById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Recipe load nahi ho saki");
  }

  return data.data.recipe;
};