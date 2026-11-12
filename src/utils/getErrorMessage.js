// Error ko user-friendly message mein badalta hai.
// Dono hooks (search aur detail) isi ko use karenge.
export const getErrorMessage = (err) =>
  err.message === "Failed to fetch"
    ? "Internet connection check karo aur dobara try karo."
    : err.message;