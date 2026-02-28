import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  bookAppointment(
    @Body()
    body: {
      clinicId: string;
      serviceId: string;
      petName: string;
      ownerName: string;
      ownerPhone: string;
      slot: string;
    },
  ) {
    return this.appointmentsService.bookAppointment(body);
  }
}
