import "../styles/DetailLoader.css";

// Recipe detail ka skeleton: hero, meta row aur kuch lines
function DetailLoader() {
  return (
    <div className="detail-loader" aria-label="Recipe load ho rahi hai">
      <div className="detail-loader__hero shimmer" />

      <div className="detail-loader__meta">
        <span className="detail-loader__pill shimmer" />
        <span className="detail-loader__pill shimmer" />
      </div>

      <div className="detail-loader__body">
        {Array.from({ length: 6 }, (_, i) => (
          <span className="detail-loader__line shimmer" key={i} />
        ))}
      </div>
    </div>
  );
}

export default DetailLoader;