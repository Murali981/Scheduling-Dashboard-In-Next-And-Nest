"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useServices } from "../../src/hooks/useServices";
import {
  CategoryFilter as CategoryFilterType,
  Service,
} from "../../src/types/DashboardTypes";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchBar } from "./components/SearchBar";
import { ServiceList } from "./components/ServiceList";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ErrorState } from "./components/ErrorState";
import { BookingForm } from "./components/BookingForm";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const clinicId = searchParams.get("clinicId") || "";

  const { data, loading, error, refetch } = useServices(clinicId);

  const [activeCategory, setActiveCategory] =
    useState<CategoryFilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const services = data?.services ?? [];
  const filteredServices = services
    .map((service) => {
      const booked = bookedSlots[service.id] || [];
      const remainingSlots = service.slots.filter(
        (slot) => !booked.includes(slot),
      );
      return {
        ...service,
        slots: remainingSlots,
        available: service.available && remainingSlots.length > 0,
      };
    })
    .filter((service) => {
      const matchesCategory =
        activeCategory === "all" || service.category === activeCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
  };

  const handleBookingSuccess = (serviceId: string, slot: string) => {
    setBookedSlots((prev) => ({
      ...prev,
      [serviceId]: [...(prev[serviceId] || []), slot],
    }));
  };

  if (!clinicId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Clinic Selected
          </h2>
          <p className="text-gray-500 mt-2">
            Please provide a clinicId in the URL. Example:
            /dashboard?clinicId=clinic_abc
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data?.clinicName || "Loading clinic..."}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Scheduling Dashboard</p>
            </div>
            {data?.currency && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                Currency: {data.currency}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {!loading && !error && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredServices.length} of {services.length} services
          </p>
        )}

        {loading && <LoadingSkeleton />}

        {error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && (
          <ServiceList
            services={filteredServices}
            currency={data?.currency || "USD"}
            onBookNow={handleBookNow}
          />
        )}
      </main>

      {selectedService && (
        <BookingForm
          service={selectedService}
          clinicId={clinicId}
          onClose={() => setSelectedService(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
