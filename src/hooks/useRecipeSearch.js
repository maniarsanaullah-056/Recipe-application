import { useEffect, useMemo, useState } from "react";
import { searchRecipes } from "../services/api";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useMyRecipes } from "../context/MyRecipesContext";

// status ki 5 halatein: "idle" | "loading" | "success" | "empty" | "error"
export function useRecipeSearch(query) {
  const { myRecipes } = useMyRecipes();

  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0); // retry ke liye

  // ===== API se search =====
  useEffect(() => {
    if (!query) return; // khali query par kuch nahi karna

    let ignore = false; // purani request ka jawab ignore karne ke liye

    const fetchRecipes = async () => {
      setStatus("loading");
      setError("");

      try {
        const data = await searchRecipes(query);
        if (ignore) return;

        setRecipes(data);
        setStatus(data.length > 0 ? "success" : "empty");
      } catch (err) {
        if (ignore) return;

        setError(getErrorMessage(err));
        setStatus("error");
      }
    };

    fetchRecipes();

    // Cleanup: query badal jaye to purani request ka result ignore
    return () => {
      ignore = true;
    };
  }, [query, attempt]);

  // ===== Meri apni recipes mein search (naam, publisher ya ingredient) =====
  const myMatches = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];

    return myRecipes
      .filter(
        (r) =>
          r.title.toLowerCase().includes(text) ||
          r.publisher.toLowerCase().includes(text) ||
          r.ingredients.some((i) => i.description.toLowerCase().includes(text))
      )
      .map(({ id, title, publisher, image_url }) => ({
        id,
        title,
        publisher,
        image_url,
      }));
  }, [myRecipes, query]);

  // Meri recipes sab se upar, phir API ki
  const allRecipes = useMemo(
    () => [...myMatches, ...recipes],
    [myMatches, recipes]
  );

  // API ko kuch na mila lekin meri recipe mil gayi, to "empty" nahi "success"
  const finalStatus =
    status === "empty" && myMatches.length > 0 ? "success" : status;

  const retry = () => setAttempt((prev) => prev + 1);

  return { recipes: allRecipes, status: finalStatus, error, retry };
}