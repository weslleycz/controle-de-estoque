import {
  IsNotEmpty,
  IsString,
  IsNumber
} from "class-validator";

export class createProductDTO {
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  @IsNumber()
  price!: number;

  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  @IsNumber()
  quantity!: number;

  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  @IsString()
  code_bar!: string;

}

