import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
export class ReviewDTO{
    @IsString()
    @IsNotEmpty()
    content:string;
    
    @IsNumber()
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    rating:number;

}
