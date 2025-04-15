import { isTokenValid } from "../services/jwt";

// Helper function to conditionally join class names
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Format price with commas and currency symbol
export function formatPrice(price) {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price;

  if (isNaN(numPrice)) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
}
export function base64ToFile(base64String, filename, mimeType) {
  const byteString = atob(base64String.split(",")[1]); // decode base64
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: mimeType });
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const refresh = JSON.parse(token).refresh;

  // Reset localstorage if refresh is already invalidated
  if (!isTokenValid(refresh)) {
    localStorage.clear();
    return false;
  }
  return true;
}
