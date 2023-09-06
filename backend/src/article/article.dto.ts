import { IsString} from "class-validator";

export class CreateArticleDTO {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    personName: string;

    @IsString()
    img: string;

    rating: number;
    content: CreateContentDTO[]; // dla tworzenia wielu treści razem z artykułem
  }
  
  export class CreateContentDTO {
    @IsString()
    type: string;

    @IsString()
    value: string;
  }