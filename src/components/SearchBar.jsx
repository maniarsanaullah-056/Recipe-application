import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // page reload na ho
    const query = text.trim();
    if (!query) return; // khali search ignore
    onSearch(query);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Search over 1,000,000 recipes..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="search__btn" type="submit">
        <FiSearch className="search__icon" />
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchBar;