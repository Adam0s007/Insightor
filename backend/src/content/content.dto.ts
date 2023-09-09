import { IsNotEmpty, IsString } from "class-validator";

export class ContentDTO {
    
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    value: string;
  }

 