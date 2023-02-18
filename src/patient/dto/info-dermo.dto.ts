import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { SkinType } from 'src/skin_type/skin_type.enum';

export class InfoDermoDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  illnessId: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  allergyId: string[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(SkinType)
  skin_type: SkinType;
}
