import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { BusinessErrorsInterceptor } from "src/shared/interceptors/business-errors.interceptor";
import { SkinType } from "./skin_type.enum";

@Controller('skin_type')
@UseInterceptors(BusinessErrorsInterceptor)
export class SkinTypeController {

  @Get()
  findAll() {
    return SkinType
  }
}