// Simple icon components
const UtensilsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M19 10V2M19 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const tabs = [
  { name: "Restaurants", icon: <UtensilsIcon /> },
  { name: "Groceries", icon: <ShoppingBagIcon /> },
  { name: "Home Based", icon: <HomeIcon /> },
  { name: "Place holder 1", icon: <UserIcon /> },
  { name: "Place holder 2", icon: <UserIcon /> },
  { name: "Place holder 3", icon: <UserIcon /> },
  { name: "Place holder 4", icon: <UserIcon /> },
  { name: "Place holder 5", icon: <UserIcon /> },
  { name: "Place holder 6", icon: <UserIcon /> },
  { name: "Place holder 7", icon: <UserIcon /> },
  { name: "Place holder 8", icon: <UserIcon /> },
];
