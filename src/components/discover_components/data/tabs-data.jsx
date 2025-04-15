import { Home, ShoppingBag, User, Utensils } from "lucide-react";

const UtensilsIcon = () => <Utensils size={20} />;

const ShoppingBagIcon = () => <ShoppingBag size={20} />;

const HomeIcon = () => <Home size={20} />;

const UserIcon = () => <User size={20} />;

export const tabs = [
  {
    title: "Restaurants",
    type: "restaurant",
    keyword: "indian restaurant food dining",
    icon: <UtensilsIcon />,
  },
  {
    title: "Groceries",
    type: "supermarket|grocery_or_supermarket|food|store",
    keyword: "indian grocery supermarket ethnic food store",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Professionals",
    type: "doctors",
    keyword: "indian doctors healthcare physicians medical professionals",
    icon: <HomeIcon />,
  },
  {
    title: "Small Businesses",
    type: "florist|convenience_store|liquor_store|pet_store|clothing_store|jewelry_store|book_store|hardware_store|pharmacy|beauty_salon|hair_care|laundry|shoe_store",
    keyword: "indian owned local business shop retail store",
    icon: <UserIcon />,
  },
];
