import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PostPaginationResponseDto,
  PostResponseDto,
} from 'src/dto/postResponse.dto';
import { PostRequestDto } from 'src/dto/postRequest.dto';
import { Post } from './schemas/post.schema';
import { PaginationDto } from 'src/dto/postPagination.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPosts(
    { limit = 5, page = 1 }: PaginationDto,
    search?: string,
  ): Promise<PostPaginationResponseDto> {
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
    const skip = (Math.max(page, 1) - 1) * Math.max(limit, 1);

    const posts = await this.postModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.postModel.countDocuments().exec();
    const pageCount = Math.ceil(total / limit);

    const postResponseDtos = posts.map((post) => ({
      id: post._id as Types.ObjectId,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return new PostPaginationResponseDto(
      total,
      pageCount,
      postResponseDtos,
      page,
    );
  }

  async getPostById(id: string): Promise<PostResponseDto> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      id: post._id as Types.ObjectId,
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }

  async createPost(requestDto: PostRequestDto): Promise<PostResponseDto> {
    const newPost = new this.postModel(requestDto);
    const saved = await newPost.save();

    return {
      id: saved._id as Types.ObjectId,
      title: saved.title,
      content: saved.content,
      author: saved.author,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  deletePost(id: string): Promise<void> {
    void this.postModel.findByIdAndDelete(id).exec();
    return Promise.resolve();
  }

  async updatePost(
    id: string,
    postRequestDto: PostRequestDto,
  ): Promise<PostResponseDto> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, postRequestDto, { new: true })
      .exec();

    if (!updatedPost) throw new Error('Post not found');

    return {
      id: updatedPost._id as Types.ObjectId,
      title: updatedPost.title,
      content: updatedPost.content,
      author: updatedPost.author,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }
}
