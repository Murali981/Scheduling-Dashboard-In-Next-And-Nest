import { Controller, Get, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getServices(
    @Query('clinicId') clinicId: string,
    @Query('category') category?: string,
  ) {
    return this.servicesService.getServicesByClinic(clinicId, category);
  }
}
