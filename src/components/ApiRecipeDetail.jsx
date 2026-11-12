import { FiAlertTriangle } from "react-icons/fi";
import { useRecipeDetail } from "../hooks/useRecipeDetail";
import { useBookmarks } from "../context/BookmarkContext";
import DetailLoader from "./DetailLoader";
import Message from "./Message";
import RecipeView from "./RecipeView";

// API se aane wali recipe: loading, error ya success
function ApiRecipeDetail({ recipeId }) {
  const { recipe, status, error, retry } = useRecipeDetail(recipeId);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (status === "loading") return <DetailLoader />;

  if (status === "error") {
    return (
      <Message
        icon={<FiAlertTriangle />}
        title="Recipe load nahi ho saki"
        text={error}
        actionLabel="Dobara try karo"
        onAction={retry}
      />
    );
  }

  return (
    <RecipeView
      recipe={recipe}
      isBookmarked={isBookmarked(recipe.id)}
      onToggleBookmark={() => toggleBookmark(recipe)}
    />
  );
}

export default ApiRecipeDetail;