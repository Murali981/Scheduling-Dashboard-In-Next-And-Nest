"use client";

import { useState } from "react";
import {
  Service,
  BookAppointmentRequest,
} from "../../../src/types/DashboardTypes";
import { bookAppointment } from "../../../src/lib/api";
import { Button } from "../../../src/components/ui/Button";

interface BookingFormProps {
  service: Service;
  clinicId: string;
  onClose: () => void;
  onSuccess: (serviceId: string, slot: string) => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function BookingForm({
  service,
  clinicId,
  onClose,
  onSuccess,
}: BookingFormProps) {
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [appointmentId, setAppointmentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    petName.trim() !== "" &&
    ownerName.trim() !== "" &&
    ownerPhone.trim() !== "" &&
    selectedSlot !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setStatus("submitting");
      setErrorMessage("");

      const data: BookAppointmentRequest = {
        clinicId,
        serviceId: service.id,
        petName: petName.trim(),
        ownerName: ownerName.trim(),
        ownerPhone: ownerPhone.trim(),
        slot: selectedSlot,
      };

      const response = await bookAppointment(data);

      if (response.status === "confirmed") {
        setStatus("success");
        setAppointmentId(response.appointmentId);
        onSuccess(service.id, selectedSlot);
      } else {
        setStatus("error");
        setErrorMessage("Booking failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={status !== "submitting" ? onClose : undefined}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-blue-600 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Book Appointment</h2>
            <p className="text-sm text-blue-100">{service.name}</p>
          </div>
          <button
            onClick={onClose}
            disabled={status === "submitting"}
            className="text-white hover:text-blue-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {status === "success" && (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Booking Confirmed!
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Appointment ID:{" "}
              <span className="font-semibold text-blue-600">
                {appointmentId}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {service.name} at {selectedSlot}
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-6"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg
                className="h-8 w-8 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Booking Failed</h3>
            <p className="text-sm text-gray-500 mt-2">{errorMessage}</p>
            <div className="flex gap-3 justify-center mt-6">
              <Button variant="outline" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setStatus("idle")}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {(status === "idle" || status === "submitting") && (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g., Buddy"
                disabled={status === "submitting"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g., John Doe"
                disabled={status === "submitting"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Phone
              </label>
              <input
                type="tel"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="e.g., +1-9876543210"
                disabled={status === "submitting"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time Slot
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                disabled={status === "submitting"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Choose a slot...</option>
                {service.slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={onClose}
                disabled={status === "submitting"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1"
                disabled={!isFormValid || status === "submitting"}
              >
                {status === "submitting" ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
