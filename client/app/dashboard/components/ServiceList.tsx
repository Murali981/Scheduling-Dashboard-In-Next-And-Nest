"use client";

import { Service } from "../../../src/types/DashboardTypes";
import { ServiceCard } from "./ServiceCard";

interface ServiceListProps {
  services: Service[];
  currency: string;
  onBookNow: (service: Service) => void;
}

export function ServiceList({
  services,
  currency,
  onBookNow,
}: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="h-16 w-16 text-gray-300 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-500">
          No services found
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          currency={currency}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
}
