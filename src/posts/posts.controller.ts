import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostResponseDto } from 'src/dto/postResponse.dto';
import { PostRequestDto } from 'src/dto/postRequest.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() postRequestDto: PostRequestDto): Promise<PostResponseDto> {
    return this.postService.createPost(postRequestDto);
  }
}
