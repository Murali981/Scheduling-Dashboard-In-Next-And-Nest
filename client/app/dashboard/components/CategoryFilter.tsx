"use client";

import { CategoryFilter as CategoryFilterType } from "../../../src/types/DashboardTypes";
import { Button } from "../../../src/components/ui/Button";

interface CategoryFilterProps {
  activeCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
}

const categories: { label: string; value: CategoryFilterType }[] = [
  { label: "All", value: "all" },
  { label: "Checkup", value: "checkup" },
  { label: "Vaccination", value: "vaccination" },
  { label: "Surgery", value: "surgery" },
];

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={activeCategory === cat.value ? "primary" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(cat.value)}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
