import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './posts.service';
import {
  PostPaginationResponseDto,
  PostResponseDto,
} from 'src/dto/postResponse.dto';
import { PostRequestDto } from 'src/dto/postRequest.dto';
import { PaginationDto } from 'src/dto/postPagination.dto';
import { CommentRequestDto } from 'src/dto/commentRequest.dto';
import { CommentService } from './comment.service';

@Controller('api/posts')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  getPosts(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
  ): Promise<PostPaginationResponseDto> {
    return this.postService.getPosts(paginationDto, search);
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

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() comment: CommentRequestDto,
  ): Promise<PostResponseDto> {
    return this.commentService.addComment(id, comment);
  }

  @Delete(':id/comments/:index')
  deleteComment(
    @Param('id') id: string,
    @Param('index') index: number,
  ): Promise<void> {
    return this.commentService.deleteComment(id, index);
  }
}
