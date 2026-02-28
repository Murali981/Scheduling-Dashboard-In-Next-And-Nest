export interface Service {
  id: string;
  name: string;
  basePrice: number;
  duration: number;
  category: "checkup" | "vaccination" | "surgery";
  available: boolean;
  slots: string[];
}

export interface ClinicServicesResponse {
  clinicId: string;
  clinicName: string;
  currency: string;
  services: Service[];
}

export interface BookAppointmentRequest {
  clinicId: string;
  serviceId: string;
  petName: string;
  ownerName: string;
  ownerPhone: string;
  slot: string;
}

export interface BookAppointmentResponse {
  appointmentId: string;
  status: "confirmed" | "failed";
}

export type CategoryFilter = "all" | "checkup" | "vaccination" | "surgery";
