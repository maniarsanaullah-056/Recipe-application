import RecipeCard from "./RecipeCard";
import "../styles/RecipeList.css";

function RecipeList({ recipes, selectedId, onSelect }) {
  return (
    <>
      <p className="recipe-list__count">{recipes.length} recipes mili</p>

      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            isActive={recipe.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </>
  );
}

export default RecipeList;