import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext();
const STORAGE_KEY = "fk-bookmarks";

// localStorage se saved bookmarks uthao. Data kharab ho to khali list.
const loadBookmarks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(loadBookmarks);

  // Jab bhi list badle, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);

  // Agar pehle se saved hai to hata do, warna sab se upar add karo
  const toggleBookmark = (recipe) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === recipe.id)
        ? prev.filter((b) => b.id !== recipe.id)
        : [
            {
              id: recipe.id,
              title: recipe.title,
              publisher: recipe.publisher,
              image_url: recipe.image_url,
            },
            ...prev,
          ]
    );
  };

  const removeBookmark = (id) =>
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

  const clearBookmarks = () => setBookmarks([]);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);