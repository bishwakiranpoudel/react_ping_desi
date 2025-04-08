"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";
import {
  Home,
  Car,
  Sofa,
  Tv2,
  Refrigerator,
  Building,
  Shirt,
  HomeIcon,
} from "lucide-react";
import { getListingCategories } from "../../services/classified";
export function CategorySelector({ onSelect }) {
  const categories = [
    { id: "house", name: "House", icon: <Home className="h-6 w-6" /> },
    { id: "auto", name: "Auto", icon: <Car className="h-6 w-6" /> },
    {
      id: "sublease",
      name: "Sublease",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    { id: "furniture", name: "Furniture", icon: <Sofa className="h-6 w-6" /> },
    {
      id: "electronics",
      name: "Electronics",
      icon: <Tv2 className="h-6 w-6" />,
    },
    {
      id: "appliance",
      name: "Appliance",
      icon: <Refrigerator className="h-6 w-6" />,
    },
    {
      id: "property",
      name: "Property",
      icon: <Building className="h-6 w-6" />,
    },
    { id: "apparel", name: "Apparel", icon: <Shirt className="h-6 w-6" /> },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-white border-b">
        <CardTitle className="text-[#232123]">Create Classified</CardTitle>
        <CardDescription className="text-[#4f4d4f]">
          Select a category to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="h-24 flex flex-col gap-2 hover:bg-[#f2e8f5] hover:border-[#7b189f]"
              onClick={() => onSelect(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
