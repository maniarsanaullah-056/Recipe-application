import { FiUsers, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import "../styles/ServingsControl.css";

function ServingsControl({ servings, onChange }) {
  return (
    <div className="servings">
      <FiUsers className="servings__icon" />

      <span className="servings__text">
        <strong>{servings}</strong> servings
      </span>

      <div className="servings__btns">
        <button
          className="servings__btn"
          aria-label="Servings kam karo"
          disabled={servings <= 1}
          onClick={() => onChange(servings - 1)}
        >
          <FiMinusCircle />
        </button>
        <button
          className="servings__btn"
          aria-label="Servings barhao"
          onClick={() => onChange(servings + 1)}
        >
          <FiPlusCircle />
        </button>
      </div>
    </div>
  );
}

export default ServingsControl;