import { FiAlertTriangle } from "react-icons/fi";
import { useMyRecipes } from "../context/MyRecipesContext";
import { useBookmarks } from "../context/BookmarkContext";
import Message from "./Message";
import RecipeView from "./RecipeView";

// Meri apni recipe: API ki zaroorat nahi, data localStorage se milta hai
function MyRecipeDetail({ recipeId, onDeleted }) {
  const { getMyRecipe, deleteRecipe } = useMyRecipes();
  const { isBookmarked, toggleBookmark, removeBookmark } = useBookmarks();

  const recipe = getMyRecipe(recipeId);

  if (!recipe) {
    return (
      <Message
        icon={<FiAlertTriangle />}
        title="Recipe nahi mili"
        text="Shayad ye recipe delete ho chuki hai."
      />
    );
  }

  const handleDelete = () => {
    if (!window.confirm(`"${recipe.title}" hamesha ke liye delete karni hai?`)) return;

    deleteRecipe(recipe.id);
    removeBookmark(recipe.id); // bookmarks mein bhi se hatao
    onDeleted(); // detail band karo
  };

  return (
    <RecipeView
      recipe={recipe}
      isBookmarked={isBookmarked(recipe.id)}
      onToggleBookmark={() => toggleBookmark(recipe)}
      onDelete={handleDelete}
    />
  );
}

export default MyRecipeDetail;