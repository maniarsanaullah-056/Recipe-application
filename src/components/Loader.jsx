import "../styles/Loader.css";

// Skeleton loader: asli cards jaisi shakal ki chamakti hui placeholders
function Loader({ count = 7 }) {
  return (
    <ul className="loader" aria-label="Recipes load ho rahi hain">
      {Array.from({ length: count }, (_, i) => (
        <li className="loader__item" key={i}>
          <span className="loader__circle" />
          <div className="loader__lines">
            <span className="loader__line loader__line--long" />
            <span className="loader__line loader__line--short" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Loader;