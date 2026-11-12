import { FiCheck } from "react-icons/fi";
import { formatQuantity } from "../utils/formatQuantity";
import "../styles/IngredientList.css";

// ratio = nayi servings / asli servings (e.g. 8 / 4 = 2)
function IngredientList({ ingredients, ratio }) {
  return (
    <ul className="ingredients">
      {ingredients.map((item, index) => (
        <li className="ingredients__item" key={index}>
          <span className="ingredients__check">
            <FiCheck />
          </span>

          <span className="ingredients__text">
            {item.quantity ? (
              <strong>{formatQuantity(item.quantity * ratio)} </strong>
            ) : null}
            {item.unit} {item.description}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default IngredientList;