import { useEffect, useState } from "react";
import { getRecipeById } from "../services/api";
import { getErrorMessage } from "../utils/getErrorMessage";

// status: "loading" | "success" | "error"
export function useRecipeDetail(id) {
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchRecipe = async () => {
      setStatus("loading");
      setError("");

      try {
        const data = await getRecipeById(id);
        if (ignore) return;

        setRecipe(data);
        setStatus("success");
      } catch (err) {
        if (ignore) return;

        setError(getErrorMessage(err));
        setStatus("error");
      }
    };

    fetchRecipe();

    return () => {
      ignore = true;
    };
  }, [id, attempt]);

  const retry = () => setAttempt((prev) => prev + 1);

  return { recipe, status, error, retry };
}