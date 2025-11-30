/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePublicationDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsEmail()
  author: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2025)
  year?: number;
}
