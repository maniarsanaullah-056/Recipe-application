// Ek khoobsurat default image (SVG), jo image na ho ya toot jaye to dikhegi
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbb871"/>
      <stop offset="1" stop-color="#f97362"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <text x="300" y="240" font-size="150" text-anchor="middle">🍽️</text>
</svg>`;

export const FALLBACK_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// <img onError={handleImageError} /> : image load na ho to fallback laga do
export const handleImageError = (e) => {
  const img = e.currentTarget;
  if (img.src.startsWith("data:")) return; // fallback khud toote to loop na bane
  img.src = FALLBACK_IMAGE;
};