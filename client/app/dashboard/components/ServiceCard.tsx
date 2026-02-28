"use client";

import { Service } from "../../../src/types/DashboardTypes";
import { Card, CardHeader, CardContent } from "../../../src/components/ui/Card";
import { Button } from "../../../src/components/ui/Button";

interface ServiceCardProps {
  service: Service;
  currency: string;
  onBookNow: (service: Service) => void;
}

function formatPrice(price: number, currency: string): string {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };
  const symbol = currencySymbols[currency] || currency + " ";
  return `${symbol}${price.toLocaleString()}`;
}

function getCategoryBadgeColor(category: Service["category"]): string {
  const colors = {
    checkup: "bg-green-100 text-green-700",
    vaccination: "bg-blue-100 text-blue-700",
    surgery: "bg-red-100 text-red-700",
  };
  return colors[category];
}

export function ServiceCard({
  service,
  currency,
  onBookNow,
}: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getCategoryBadgeColor(service.category)}`}
          >
            {service.category}
          </span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {formatPrice(service.basePrice, currency)}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col grow">
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{service.duration} minutes</span>
        </div>

        {/* Available Slots */}
        <div className="mb-4 grow">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Available Slots:
          </p>
          {service.available && service.slots.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {service.slots.map((slot) => (
                <span
                  key={slot}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                >
                  {slot}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500 italic">No slots available</p>
          )}
        </div>

        {/* Availability Status & Book Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span
            className={`flex items-center gap-1.5 text-sm font-medium ${
              service.available ? "text-green-600" : "text-red-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                service.available ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {service.available ? "Available" : "Unavailable"}
          </span>

          <Button
            variant="primary"
            size="sm"
            disabled={!service.available}
            onClick={() => onBookNow(service)}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
