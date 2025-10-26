import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CommentRequestDto } from 'src/dto/commentRequest.dto';
import { PostResponseDto } from 'src/dto/postResponse.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  private formatKST(timestamp: number): string {
    // timestamp가 밀리초 단위인 경우
    const date = new Date(timestamp);

    // 한국 시간대 문자열로 변환
    // toLocaleString은 자동으로 시스템 로케일 기반 포맷을 사용
    const koreanTime = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    return koreanTime;
  }

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
      this.formatKST(result.createdAt.getTime()),
      this.formatKST(result.updatedAt.getTime()),
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
