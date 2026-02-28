"use client";

import { useState, useEffect, useCallback } from "react";
import { getClinicServices } from "../lib/api";
import { ClinicServicesResponse } from "../types/DashboardTypes";

interface UseServicesReturn {
  data: ClinicServicesResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useServices(clinicId: string): UseServicesReturn {
  const [data, setData] = useState<ClinicServicesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    if (!clinicId) {
      setError("Clinic ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await getClinicServices(clinicId);
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch services. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [clinicId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { data, loading, error, refetch: fetchServices };
}
