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

export default function DashboardPage() {
  // Step 1: Get clinicId from URL  →  /dashboard?clinicId=clinic_abc
  const searchParams = useSearchParams();
  const clinicId = searchParams.get("clinicId") || "";

  // Step 2: Fetch services from API
  const { data, loading, error, refetch } = useServices(clinicId);

  // Step 3: Filter & Search state
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilterType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Step 4: Filter services based on category + search (both work together)
  const services = data?.services ?? [];
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Step 5: Handle Book Now click (will be completed in Part 2)
  const handleBookNow = (service: Service) => {
    console.log("Book Now clicked for:", service.name);
  };

  // Step 6: No clinicId provided
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
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
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

        {/* Service Count
        {!loading && !error && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredServices.length} of {data?.services.length || 0}{" "}
            services
          </p>
        )}

        {/* Content States */}
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
    </div>
  );
}
