import { IsNotEmpty, Length, IsEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsEmpty()
  number: string;

  @IsNotEmpty()
  @Length(1, 125)
  name: string;

  @IsNotEmpty()
  @Length(1, 25)
  region: string;

  @IsNotEmpty()
  @Length(1, 25)
  district: string;
}
