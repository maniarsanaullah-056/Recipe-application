import { isMyRecipeId } from "../context/MyRecipesContext";
import ApiRecipeDetail from "./ApiRecipeDetail";
import MyRecipeDetail from "./MyRecipeDetail";

// Sirf ye faisla karta hai ke recipe API ki hai ya meri apni
function RecipeDetail({ recipeId, onDeleted }) {
  if (isMyRecipeId(recipeId)) {
    return <MyRecipeDetail recipeId={recipeId} onDeleted={onDeleted} />;
  }

  return <ApiRecipeDetail recipeId={recipeId} />;
}

export default RecipeDetail;