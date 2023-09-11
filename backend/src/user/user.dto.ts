import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ArticleEntity } from 'src/article/article.entity';

export class UserDTO {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]{3,30}$/, {
    message: 'Name should be between 3 and 30 characters',
  })
  name: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z]{3,30}$/, {
    message: 'Surname should be between 3 and 30 characters',
  })
  surname: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LoginUserDTO {
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UserRO {
  id: string;
  name: string;
  surname: string;
  email: string;
  created: Date;
  ideas?: ArticleEntity[];
  token?: string;
  bookmarks?: ArticleEntity[];
  articles?: ArticleEntity[];
}
