import { useEffect, useRef, useState } from "react";
import { FiBookmark, FiTrash2 } from "react-icons/fi";
import { useBookmarks } from "../context/BookmarkContext";
import BookmarkItem from "./BookmarkItem";
import Message from "./Message";
import "../styles/BookmarksMenu.css";

function BookmarksMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  // Dropdown khula ho to: bahar click ya Escape par band karo
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Cleanup: band hone par listeners hata do
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (id) => {
    onSelect(id);
    setOpen(false);
  };

  const handleClear = () => {
    if (window.confirm("Saare bookmarks hata dein?")) clearBookmarks();
  };

  return (
    <div className="bookmarks" ref={menuRef}>
      <button
        className="nav__btn"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiBookmark />
        <span>Bookmarks</span>
        {bookmarks.length > 0 && (
          <em className="bookmarks__badge" key={bookmarks.length}>
            {bookmarks.length}
          </em>
        )}
      </button>

      {open && (
        <div className="bookmarks__panel">
          <div className="bookmarks__head">
            <h3 className="bookmarks__title">Saved recipes</h3>

            {bookmarks.length > 0 && (
              <button className="bookmarks__clear" onClick={handleClear}>
                <FiTrash2 />
                Clear all
              </button>
            )}
          </div>

          {bookmarks.length === 0 ? (
            <Message
              icon={<FiBookmark />}
              title="Abhi koi bookmark nahi hai"
              text="Kisi recipe par bookmark button dabao, wo yahan save ho jayegi."
            />
          ) : (
            <ul className="bookmarks__list">
              {bookmarks.map((recipe) => (
                <BookmarkItem
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={handleSelect}
                  onRemove={removeBookmark}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default BookmarksMenu;