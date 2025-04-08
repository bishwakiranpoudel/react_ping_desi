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
  Sofa,
  Tv2,
  Refrigerator,
  Building,
  Shirt,
  HomeIcon,
} from "lucide-react";
import { getListingCategories } from "../../services/classified";

// Map of category IDs to their corresponding icons
const iconMap = {
  house: <Home className="h-6 w-6" />,
  auto: <Car className="h-6 w-6" />,
  sublease: <HomeIcon className="h-6 w-6" />,
  furniture: <Sofa className="h-6 w-6" />,
  electronics: <Tv2 className="h-6 w-6" />,
  appliance: <Refrigerator className="h-6 w-6" />,
  property: <Building className="h-6 w-6" />,
  apparel: <Shirt className="h-6 w-6" />,
};

export function CategorySelector({ onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getListingCategories();
        setCategories(fetchedCategories.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-white border-b">
        <CardTitle className="text-[#232123]">Create Classified</CardTitle>
        <CardDescription className="text-[#4f4d4f]">
          Select a category to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <p>Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-24 flex flex-col gap-2 hover:bg-[#f2e8f5] hover:border-[#7b189f]"
                onClick={() => onSelect(category.id)}
              >
                {iconMap[category.id] || <Home className="h-6 w-6" />}
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
