import { Injectable } from '@nestjs/common';

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
  status: 'confirmed' | 'failed';
}

@Injectable()
export class AppointmentsService {
  bookAppointment(data: BookAppointmentRequest): BookAppointmentResponse {
    // Generate a random appointment ID like "apt_a1b2c3"
    const randomId = Math.random().toString(36).substring(2, 8);
    const appointmentId = `apt_${randomId}`;

    // Simulate: 90% success, 10% failure
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      return {
        appointmentId,
        status: 'confirmed',
      };
    } else {
      return {
        appointmentId: '',
        status: 'failed',
      };
    }
  }
}
