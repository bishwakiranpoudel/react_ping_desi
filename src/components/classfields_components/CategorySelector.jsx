"use client";
import { useEffect, useState } from "react";
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
  Tv2,
  Refrigerator,
  Building,
  Shirt,
  Users,
} from "lucide-react";
import { getListingCategories } from "../../services/classified";
const iconMapping = {
  House: <Home className="h-6 w-6" />,
  Auto: <Car className="h-6 w-6" />,
  Sublease: <Building className="h-6 w-6" />,
  Electronics: <Tv2 className="h-6 w-6" />,
  Appliances: <Refrigerator className="h-6 w-6" />,
  Apparels: <Shirt className="h-6 w-6" />,
  Roommate: <Users className="h-6 w-6" />,
};

export function CategorySelector({ onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getListingCategories();

        if (response && response.status === "sucess" && response.data) {
          setCategories(response.data);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError("Error fetching categories: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p>Loading categories...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              {iconMapping[category.name] || <Building className="h-6 w-6" />}
              <span>{category.name}</span>
              <span className="text-xs text-gray-500 line-clamp-1">
                {category.subtitle}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
