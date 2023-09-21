import { IsString } from 'class-validator';

export class CategoryDTO {
  @IsString()
  readonly name: string;
}

export class UpdateArticleCategoriesDTO {
  @IsString({ each: true })
  readonly names: string[];
}
