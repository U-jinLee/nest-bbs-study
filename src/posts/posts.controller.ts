import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { PostResponseDto } from 'src/dto/postResponse.dto';
import { PostRequestDto } from 'src/dto/postRequest.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(): Promise<PostResponseDto[]> {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): Promise<PostResponseDto> {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    return this.postService.createPost(postRequestDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postService.deletePost(id);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() postRequestDto: PostRequestDto,
  ): Promise<PostResponseDto> {
    return this.postService.updatePost(id, postRequestDto);
  }
}
