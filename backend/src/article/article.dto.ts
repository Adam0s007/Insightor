import { Type } from "class-transformer";
import { IsNumber, IsString, Max, Min, ValidateNested} from "class-validator";
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
    
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ValidateNested({ each: true })
    @Type(() => ContentDTO)
    content: ContentDTO[]; // dla tworzenia wielu treści razem z artykułem
  }
  

