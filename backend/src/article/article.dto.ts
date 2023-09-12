import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested} from "class-validator";
import { ContentDTO } from "src/content/content.dto";

export class ArticleDTO {
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsNumber()
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    imgUrl: string;

    @ValidateNested({ each: true })
    @Type(() => ContentDTO)
    @IsNotEmpty()
    content: ContentDTO[]; // dla tworzenia wielu treści razem z artykułem
  }
  

