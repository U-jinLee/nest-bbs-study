import { Types } from 'mongoose';

export class PostPaginationResponseDto {
  readonly total: number;
  readonly pageCount: number;
  readonly currentPage: number;
  readonly posts: PostResponseDto[];
  readonly hasPreviousPage?: boolean;
  readonly hasNextPage?: boolean;

  constructor(
    total: number,
    pageCount: number,
    posts: PostResponseDto[],
    currentPage: number,
  ) {
    this.total = total;
    this.pageCount = pageCount;
    this.posts = posts;
    this.currentPage = currentPage;
    this.hasPreviousPage = currentPage > 1;
    this.hasNextPage = currentPage < this.pageCount;
  }
}

export class PostResponseDto {
  readonly id: Types.ObjectId;
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
