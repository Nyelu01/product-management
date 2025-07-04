import { IsOptional, Length } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @Length(1, 125)
  name?: string;

  @IsOptional()
  @Length(1, 25)
  region?: string;

  @IsOptional()
  @Length(1, 25)
  district?: string;
}
