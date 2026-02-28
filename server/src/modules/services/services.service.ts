import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  private readonly clinics = [
    {
      clinicId: 'clinic_abc',
      clinicName: 'PawCare Clinic',
      currency: 'USD',
      services: [
        {
          id: 'svc_1',
          name: 'General Checkup',
          basePrice: 500,
          duration: 30,
          category: 'checkup',
          available: true,
          slots: ['09:00', '10:30', '14:00', '16:00'],
        },
        {
          id: 'svc_2',
          name: 'Rabies Vaccination',
          basePrice: 300,
          duration: 15,
          category: 'vaccination',
          available: true,
          slots: ['09:30', '11:00', '13:00', '15:30'],
        },
        {
          id: 'svc_3',
          name: 'Dental Cleaning',
          basePrice: 1200,
          duration: 60,
          category: 'surgery',
          available: true,
          slots: ['10:00', '14:00'],
        },
        {
          id: 'svc_4',
          name: 'Spay/Neuter Surgery',
          basePrice: 2500,
          duration: 90,
          category: 'surgery',
          available: false,
          slots: [],
        },
        {
          id: 'svc_5',
          name: 'Annual Vaccination Package',
          basePrice: 800,
          duration: 20,
          category: 'vaccination',
          available: true,
          slots: ['09:00', '11:30', '14:30', '16:30'],
        },
        {
          id: 'svc_6',
          name: 'Puppy Wellness Exam',
          basePrice: 400,
          duration: 25,
          category: 'checkup',
          available: true,
          slots: ['08:30', '10:00', '13:30', '15:00'],
        },
      ],
    },
  ];

  getServicesByClinic(clinicId: string, category?: string) {
    const clinic = this.clinics.find((c) => c.clinicId === clinicId);

    if (!clinic) {
      return {
        clinicId,
        clinicName: 'Unknown Clinic',
        currency: 'USD',
        services: [],
      };
    }

    let services = clinic.services;

    if (category) {
      services = services.filter((s) => s.category === category);
    }

    return {
      clinicId: clinic.clinicId,
      clinicName: clinic.clinicName,
      currency: clinic.currency,
      services,
    };
  }
}
