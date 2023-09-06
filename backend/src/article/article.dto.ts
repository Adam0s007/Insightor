import { IsString} from "class-validator";

export class ArticleDTO {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    personName: string;

    @IsString()
    img: string;

    rating: number;
    content: ContentDTO[]; // dla tworzenia wielu treści razem z artykułem
  }
  
  export class ContentDTO {

    @IsString()
    type: string;

    @IsString()
    value: string;

  }

