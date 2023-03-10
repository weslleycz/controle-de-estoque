import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from 'class-transformer';

export type IProduct={
  price: number
}

export class Product {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  code_bar!: string;
}

export class createSaleDTO {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products!: Product[];

  @IsNotEmpty()
  @IsNumber()
  money!:number;
}
