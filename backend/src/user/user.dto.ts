import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { ArticleEntity } from "src/article/article.entity";

export class UserDTO {


    @IsNotEmpty()
    
    personName: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'The password must contain at least one uppercase letter, one lowercase letter, and one special character.' })
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class UserRO{
    id: string;
    personName: string;
    email: string;
    created: Date;
    ideas?: ArticleEntity[];
    token?: string;
    bookmarks?: ArticleEntity[];
}