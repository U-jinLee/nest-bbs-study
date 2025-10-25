import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostResponseDto } from 'src/dto/postResponse.dto';
import { PostRequestDto } from 'src/dto/postRequest.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  getPosts(): string {
    return 'Hello World!';
  }

  async createPost(requestDto: PostRequestDto): Promise<PostResponseDto> {
    const newPost = new this.postModel(requestDto);
    const saved = await newPost.save();

    return {
      id: saved._id as Types.ObjectId,
      title: saved.title,
      author: saved.author,
    };
  }
}
