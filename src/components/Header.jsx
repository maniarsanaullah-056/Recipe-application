import { MdRestaurant } from "react-icons/md";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import AddRecipe from "./AddRecipe";
import BookmarksMenu from "./BookmarksMenu";
import "../styles/Header.css";

function Header({ onSearch, onSelectRecipe }) {
  return (
    <header className="header">
      {/* Logo */}
      <a className="logo" href="/">
        <span className="logo__icon">
          <MdRestaurant />
        </span>
        <span className="logo__text">forkify</span>
      </a>

      {/* Search */}
      <SearchBar onSearch={onSearch} />

      {/* Right side: nav + theme */}
      <div className="header__right">
        <nav className="nav">
          <AddRecipe onAdded={onSelectRecipe} />
          <BookmarksMenu onSelect={onSelectRecipe} />
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;