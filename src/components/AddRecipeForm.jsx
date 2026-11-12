import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FALLBACK_IMAGE } from "../utils/placeholderImage";
import "../styles/AddRecipeForm.css";

// Har ingredient row ki apni unique id (React ko list pehchanne ke liye)
let nextRowId = 1;
const createRow = () => ({
  id: nextRowId++,
  quantity: "",
  unit: "",
  description: "",
});

const INITIAL_FORM = {
  title: "",
  publisher: "",
  imageUrl: "",
  cookingTime: "",
  servings: "4",
  directions: "",
};

// Label + input + error ka chhota reusable wrapper
function Field({ label, error, full, children }) {
  return (
    <label className={`field ${full ? "field--full" : ""}`}>
      <span className="field__label">{label}</span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}

function AddRecipeForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [rows, setRows] = useState(() => [createRow(), createRow()]);
  const [errors, setErrors] = useState({});

  // ===== Form fields =====
  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ===== Ingredient rows =====
  const updateRow = (id, field, value) =>
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );

  const addRow = () => setRows((prev) => [...prev, createRow()]);

  // Kam az kam 1 row hamesha rahe
  const removeRow = (id) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  // ===== Validation =====
  const validate = () => {
    const found = {};

    if (!form.title.trim()) found.title = "Recipe ka naam likhna zaroori hai";
    if (!(Number(form.cookingTime) >= 1)) found.cookingTime = "Kam az kam 1 minute";
    if (!(Number(form.servings) >= 1)) found.servings = "Kam az kam 1 serving";

    const image = form.imageUrl.trim();
    if (image && !/^https?:\/\//i.test(image)) {
      found.imageUrl = "Link http:// ya https:// se shuru hona chahiye";
    }

    if (!rows.some((r) => r.description.trim())) {
      found.ingredients = "Kam az kam ek ingredient likho";
    } else if (rows.some((r) => r.quantity !== "" && !(Number(r.quantity) >= 0))) {
      found.ingredients = "Quantity sahi number honi chahiye";
    }

    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // API wali recipe jaisi shakal mein data bhejo
    onSubmit({
      title: form.title.trim(),
      publisher: form.publisher.trim() || "Me",
      image_url: form.imageUrl.trim() || FALLBACK_IMAGE,
      cooking_time: Math.round(Number(form.cookingTime)),
      servings: Math.round(Number(form.servings)),
      directions: form.directions.trim(),
      ingredients: rows
        .filter((r) => r.description.trim()) // khali rows chhod do
        .map((r) => ({
          quantity: r.quantity === "" ? null : Number(r.quantity),
          unit: r.unit.trim(),
          description: r.description.trim(),
        })),
    });
  };

  const inputClass = (name) =>
    `form-input ${errors[name] ? "is-invalid" : ""}`;

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <div className="recipe-form__grid">
        <Field label="Recipe ka naam *" error={errors.title} full>
          <input
            className={inputClass("title")}
            name="title"
            value={form.title}
            onChange={updateField}
            placeholder="e.g. Chicken Karahi"
            autoFocus
          />
        </Field>

        <Field label="Aapka naam (publisher)">
          <input
            className="form-input"
            name="publisher"
            value={form.publisher}
            onChange={updateField}
            placeholder="Optional"
          />
        </Field>

        <Field label="Image ka link" error={errors.imageUrl}>
          <input
            className={inputClass("imageUrl")}
            name="imageUrl"
            value={form.imageUrl}
            onChange={updateField}
            placeholder="https://... (optional)"
          />
        </Field>

        <Field label="Cooking time (minutes) *" error={errors.cookingTime}>
          <input
            className={inputClass("cookingTime")}
            name="cookingTime"
            type="number"
            min="1"
            value={form.cookingTime}
            onChange={updateField}
            placeholder="45"
          />
        </Field>

        <Field label="Servings *" error={errors.servings}>
          <input
            className={inputClass("servings")}
            name="servings"
            type="number"
            min="1"
            value={form.servings}
            onChange={updateField}
          />
        </Field>

        {/* ===== Ingredients ===== */}
        <fieldset className="ingredients-field field--full">
          <legend className="field__label">Ingredients *</legend>

          {rows.map((row) => (
            <div className="ing-row" key={row.id}>
              <input
                className="form-input ing-row__qty"
                type="number"
                min="0"
                step="any"
                aria-label="Quantity"
                placeholder="Qty"
                value={row.quantity}
                onChange={(e) => updateRow(row.id, "quantity", e.target.value)}
              />
              <input
                className="form-input ing-row__unit"
                aria-label="Unit"
                placeholder="Unit (cup, tbsp)"
                value={row.unit}
                onChange={(e) => updateRow(row.id, "unit", e.target.value)}
              />
              <input
                className="form-input ing-row__desc"
                aria-label="Ingredient ka naam"
                placeholder="Ingredient (e.g. tomatoes)"
                value={row.description}
                onChange={(e) => updateRow(row.id, "description", e.target.value)}
              />
              <button
                type="button"
                className="ing-row__remove"
                aria-label="Ye ingredient hatao"
                disabled={rows.length === 1}
                onClick={() => removeRow(row.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}

          {errors.ingredients && (
            <span className="field__error">{errors.ingredients}</span>
          )}

          <button type="button" className="add-row-btn" onClick={addRow}>
            <FiPlus />
            Ingredient add karo
          </button>
        </fieldset>

        <Field label="How to cook it" full>
          <textarea
            className="form-input form-textarea"
            name="directions"
            value={form.directions}
            onChange={updateField}
            placeholder="Banane ka tareeqa likho (optional)"
          />
        </Field>
      </div>

      <div className="recipe-form__actions">
        <button type="button" className="form-btn form-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="form-btn form-btn--primary">
          Save recipe
        </button>
      </div>
    </form>
  );
}

export default AddRecipeForm;