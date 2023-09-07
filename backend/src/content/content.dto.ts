import { IsString } from "class-validator";

export class ContentDTO {
    
    @IsString()
    type: string;

    @IsString()
    value: string;
  }

 