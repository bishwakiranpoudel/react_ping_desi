import { Home, ShoppingBag, User, Utensils, Stethoscope } from "lucide-react";

const UtensilsIcon = () => <Utensils size={20} />;
const ShoppingBagIcon = () => <ShoppingBag size={20} />;
const HealthcareIcon = () => <Stethoscope size={20} />;
const UserIcon = () => <User size={20} />;

export const tabs = [
  {
    title: "Restaurants",
    type: "restaurant",
    keyword: "restaurant food dining ethnic cuisine",
    icon: <UtensilsIcon />,
  },
  {
    title: "Groceries",
    type: "grocery_or_supermarket|supermarket|food|store",
    keyword: "grocery supermarket ethnic food market",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Professionals",
    type: "doctor|dentist|hospital|physiotherapist|pharmacy|health",
    keyword: "healthcare medical professionals services",
    icon: <HealthcareIcon />,
  },
  {
    title: "Small Businesses",
    type: "store|shop|clothing_store|beauty_salon|hair_care|jewelry_store|book_store|florist|hardware_store|pet_store|shoe_store|electronics_store|home_goods_store",
    keyword: "local business small shop retail boutique",
    icon: <UserIcon />,
  },
];
