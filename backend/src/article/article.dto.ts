import { IsString} from "class-validator";
import { ContentDTO } from "src/content/content.dto";

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
  

