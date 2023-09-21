import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested} from "class-validator";
import { CategoryDTO } from "src/category/category.dto";
import { ContentDTO } from "src/content/content.dto";

export class ArticleDTO {
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    

    @IsString()
    @IsNotEmpty()
    imgUrl: string;

    @ValidateNested({ each: true })
    @Type(() => ContentDTO)
    @IsNotEmpty()
    content: ContentDTO[];
    
    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @IsNotEmpty()
    categories: CategoryDTO[];


  }
  

