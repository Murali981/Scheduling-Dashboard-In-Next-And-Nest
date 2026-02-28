import axios from "axios";
import {
  ClinicServicesResponse,
  BookAppointmentRequest,
  BookAppointmentResponse,
} from "../types/DashboardTypes";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClinicServices = async (
  clinicId: string,
  category?: string,
): Promise<ClinicServicesResponse> => {
  const params: Record<string, string> = { clinicId };
  if (category && category !== "all") {
    params.category = category;
  }
  const res = await api.get<ClinicServicesResponse>("/api/services", {
    params,
  });
  return res.data;
};

export const bookAppointment = async (
  data: BookAppointmentRequest,
): Promise<BookAppointmentResponse> => {
  const res = await api.post<BookAppointmentResponse>(
    "/api/appointments",
    data,
  );
  return res.data;
};
