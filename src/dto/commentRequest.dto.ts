import { Comment } from 'src/posts/schemas/post.schema';

export class CommentRequestDto {
  readonly content: string;
  readonly author: string;
}
