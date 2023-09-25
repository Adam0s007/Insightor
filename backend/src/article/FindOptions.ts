export class FindOptions {
  constructor(
    public max?: number,
    public page?: number,
    public text?: string,
    public category?: string,
    public sortBy?: 'date' | 'rating' | 'reviews',
    public sortOrder?: 'ASC' | 'DESC',
  ) {}
}
