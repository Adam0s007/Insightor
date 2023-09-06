import { IsString } from "class-validator";

export class ContentDTO {
    
    @IsString()
    type: string;

    @IsString()
    value: string;
  }

  export class ContentExtended {
    @IsString()
    type: string;

    @IsString()
    value: string;
    @IsString()
    articleId: string; // ID artykułu, z którym treść powinna być powiązana
  }