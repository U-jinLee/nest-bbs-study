import { Types } from 'mongoose';
import { Comment } from 'src/posts/schemas/post.schema';

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
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly comments?: Comment[];

  constructor(
    id: Types.ObjectId,
    title: string,
    content: string,
    author: string,
    createdAt: string,
    updatedAt: string,
    comments: Comment[],
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.comments = comments;
  }
}
