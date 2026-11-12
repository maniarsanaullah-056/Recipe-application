import { useCallback, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useMyRecipes } from "../context/MyRecipesContext";
import Modal from "./Modal";
import AddRecipeForm from "./AddRecipeForm";

// Header ka "Add Recipe" button + uska popup
function AddRecipe({ onAdded }) {
  const [open, setOpen] = useState(false);
  const { addRecipe } = useMyRecipes();

  // useCallback: har render par naya function na bane (Modal ka effect baar baar na chale)
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSubmit = (data) => {
    const id = addRecipe(data);
    setOpen(false);
    onAdded(id); // nayi recipe seedha khul jaye
  };

  return (
    <>
      <button className="nav__btn" onClick={() => setOpen(true)}>
        <FiEdit />
        <span>Add Recipe</span>
      </button>

      {open && (
        <Modal title="Apni recipe add karo" onClose={handleClose}>
          <AddRecipeForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default AddRecipe;