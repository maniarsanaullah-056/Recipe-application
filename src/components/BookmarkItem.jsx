import { FiX } from "react-icons/fi";
import "../styles/BookmarkItem.css";
import { handleImageError } from "../utils/placeholderImage";

function BookmarkItem({ recipe, onSelect, onRemove }) {
  return (
    <li className="bookmark-item">
      {/* Main area: click par recipe khulti hai */}
      <button
        className="bookmark-item__main"
        onClick={() => onSelect(recipe.id)}
      >
        <img
          className="bookmark-item__img"
          onError={handleImageError}
          src={recipe.image_url}
          alt={recipe.title}
          loading="lazy"
        />
        <div className="bookmark-item__info">
          <h4 className="bookmark-item__title">{recipe.title}</h4>
          <p className="bookmark-item__publisher">{recipe.publisher}</p>
        </div>
      </button>

      {/* Alag button: bookmark hatane ke liye */}
      <button
        className="bookmark-item__remove"
        aria-label={`${recipe.title} ka bookmark hatao`}
        onClick={() => onRemove(recipe.id)}
      >
        <FiX />
      </button>
    </li>
  );
}

export default BookmarkItem;