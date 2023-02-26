import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCaseDto } from './create-case.dto';
import { CurrencyType } from './../../currency_type/currency_type.enum';

export class UpdateCaseDto extends PartialType(CreateCaseDto) {
  @IsString()
  @IsNotEmpty()
  cci: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(CurrencyType)
  @IsNotEmpty()
  currency_type: string;
}
