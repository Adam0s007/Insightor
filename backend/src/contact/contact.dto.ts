import { IsNotEmpty, IsEmail } from "class-validator";

// contact.dto.ts
export class CreateContactDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    message: string;
  }
  