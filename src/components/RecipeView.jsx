import { useEffect, useState } from "react";
import { FiClock, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { handleImageError } from "../utils/placeholderImage";
import ServingsControl from "./ServingsControl";
import IngredientList from "./IngredientList";
import "../styles/RecipeView.css";

const DEFAULT_TITLE = "Forkify | Recipe Finder";

function RecipeView({ recipe, isBookmarked = false, onToggleBookmark, onDelete }) {
  // Servings ki apni state: asli value se shuru hoti hai
  const [servings, setServings] = useState(recipe.servings);

  const ratio = servings / recipe.servings;

  // Browser tab ka title recipe ka naam ban jaye, band hone par wapas default
  useEffect(() => {
    document.title = `${recipe.title} | Forkify`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [recipe.title]);

  return (
    <article className="recipe">
      {/* ===== Hero image + title ===== */}
      <figure className="hero">
        <div className="hero__frame">
          <img
            className="hero__img"
            src={recipe.image_url}
            alt={recipe.title}
            onError={handleImageError}
          />
        </div>
        <h2 className="hero__title">{recipe.title}</h2>
      </figure>

      {/* ===== Time, servings, actions ===== */}
      <div className="meta">
        <div className="meta__item">
          <FiClock className="meta__icon" />
          <span>
            <strong>{recipe.cooking_time}</strong> minutes
          </span>
        </div>

        <ServingsControl servings={servings} onChange={setServings} />

        <div className="meta__actions">
          {/* Delete sirf apni recipes par (onDelete prop ho to) */}
          {onDelete && (
            <button
              className="meta__delete"
              aria-label="Recipe delete karo"
              title="Recipe delete karo"
              onClick={onDelete}
            >
              <FiTrash2 />
            </button>
          )}

          <button
            className={`meta__bookmark ${isBookmarked ? "is-active" : ""}`}
            aria-label={isBookmarked ? "Bookmark hatao" : "Bookmark karo"}
            title={isBookmarked ? "Bookmark hatao" : "Bookmark karo"}
            onClick={onToggleBookmark}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>

      {/* ===== Ingredients ===== */}
      <section className="section section--tinted">
        <h3 className="section__title">Recipe Ingredients</h3>
        <IngredientList ingredients={recipe.ingredients} ratio={ratio} />
      </section>

      {/* ===== Directions ===== */}
      <section className="section section--center">
        <h3 className="section__title">How to cook it</h3>

        {recipe.directions ? (
          // Apni recipe: likha hua tareeqa dikhao
          <p className="section__text section__text--directions">
            {recipe.directions}
          </p>
        ) : (
          // API ki recipe (ya tareeqa khali): original website ka link
          <>
            <p className="section__text">
              This recipe was carefully designed and tested by{" "}
              <strong>{recipe.publisher}</strong>. Please check out directions
              at their website.
            </p>

            {recipe.source_url && (
              <a
                className="directions-btn"
                href={recipe.source_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Directions</span>
                <FiExternalLink />
              </a>
            )}
          </>
        )}
      </section>
    </article>
  );
}

export default RecipeView;