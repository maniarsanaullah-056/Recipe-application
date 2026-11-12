import { isMyRecipeId } from "../context/MyRecipesContext";
import { handleImageError } from "../utils/placeholderImage";
import "../styles/RecipeCard.css";

function RecipeCard({ recipe, index, isActive, onSelect }) {
  return (
    <li>
      <button
        className={`recipe-card ${isActive ? "is-active" : ""}`}
        // Cards ek ke baad ek aate hain (stagger), max 10 tak delay
        style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
        onClick={() => onSelect(recipe.id)}
      >
        <img
          className="recipe-card__img"
          src={recipe.image_url}
          alt={recipe.title}
          loading="lazy"
          onError={handleImageError}
        />

        <div className="recipe-card__info">
          <h4 className="recipe-card__title">{recipe.title}</h4>
          <p className="recipe-card__publisher">
            {recipe.publisher}
            {isMyRecipeId(recipe.id) && (
              <span className="recipe-card__tag">Mine</span>
            )}
          </p>
        </div>
      </button>
    </li>
  );
}

export default RecipeCard;