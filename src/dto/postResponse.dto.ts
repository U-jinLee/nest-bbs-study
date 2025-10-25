import { Types } from 'mongoose';

export class PostResponseDto {
  readonly id: Types.ObjectId;
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
