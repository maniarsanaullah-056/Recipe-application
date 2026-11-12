// Common fractions: 0.5 ko "½" dikhane ke liye
const FRACTIONS = [
  { value: 1 / 8, symbol: "⅛" },
  { value: 1 / 4, symbol: "¼" },
  { value: 1 / 3, symbol: "⅓" },
  { value: 3 / 8, symbol: "⅜" },
  { value: 1 / 2, symbol: "½" },
  { value: 5 / 8, symbol: "⅝" },
  { value: 2 / 3, symbol: "⅔" },
  { value: 3 / 4, symbol: "¾" },
  { value: 7 / 8, symbol: "⅞" },
];

export function formatQuantity(value) {
  if (!value) return "";

  const whole = Math.floor(value);
  const decimal = value - whole;

  // Bilkul poora number (e.g. 2.0)
  if (decimal < 0.04) return String(whole);
  // Poora hone ke qareeb (e.g. 1.98 -> 2)
  if (decimal > 0.96) return String(whole + 1);

  // Sab se qareebi fraction dhundo
  const closest = FRACTIONS.reduce((best, f) =>
    Math.abs(f.value - decimal) < Math.abs(best.value - decimal) ? f : best
  );

  if (Math.abs(closest.value - decimal) < 0.03) {
    return whole ? `${whole} ${closest.symbol}` : closest.symbol;
  }

  // Koi fraction match na ho to 2 decimal tak
  return String(Math.round(value * 100) / 100);
}