// Helper function to conditionally join class names
export function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
  // Format price with commas and currency symbol
  export function formatPrice(price) {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
  
    if (isNaN(numPrice)) return "$0"
  
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice)
  }
  