import { Types } from 'mongoose';

export class PostResponseDto {
  readonly id: Types.ObjectId;
  readonly title: string;
  readonly author: string;
}
