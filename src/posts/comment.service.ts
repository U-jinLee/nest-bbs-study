import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CommentRequestDto } from 'src/dto/commentRequest.dto';
import { PostResponseDto } from 'src/dto/postResponse.dto';
import { formatKST } from 'src/common/util/timeUtil';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async addComment(
    postId: string,
    comment: CommentRequestDto,
  ): Promise<PostResponseDto> {
    const post = await this.postModel.findById(postId);

    if (!post) throw new Error('Post not found');

    post.comments.push({
      content: comment.content,
      author: comment.author,
    });

    const result = await post.save();

    return new PostResponseDto(
      result._id as Types.ObjectId,
      result.title,
      result.content,
      result.author,
      formatKST(result.createdAt.getTime()),
      formatKST(result.updatedAt.getTime()),
      result.comments.map((c) => ({
        content: c.content,
        author: c.author,
      })),
    );
  }

  async deleteComment(postId: string, index: number): Promise<void> {
    const post = await this.postModel.findById(postId);
    if (!post) throw new Error('Post not found');
    if (index < 0 || index >= post.comments.length) {
      throw new Error('Comment index out of bounds');
    }

    post.comments.splice(index, 1);

    await post.save();
  }
}
