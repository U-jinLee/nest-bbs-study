import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { PostService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Render('partials/home')
  async getHome() {
    const result = await this.postService.getPosts({ limit: 3, page: 1 });
    return { posts: result.posts };
  }

  @Get('posts/write')
  @Render('partials/write')
  getPostWrite() {
    return {};
  }

  @Get('posts')
  @Render('partials/list')
  async getPosts(
    @Query() { limit = 5, page = 1 },
    @Query('search') search?: string,
  ) {
    const result = await this.postService.getPosts({ limit, page }, search);
    return {
      data: result.posts, // 게시글 데이터
      page: result.pageCount,
      limit: limit,
      currentPage: result.currentPage,
      total: result.total,
      totalPages: result.pageCount,
      search: search || '',
      hasPreviousPage: result.hasPreviousPage,
      hasNextPage: result.hasNextPage,
    };
  }

  @Get('posts/:id')
  @Render('partials/detail')
  async getPost(@Param('id') id: string) {
    const result = await this.postService.getPostById(id);
    const comments = result.comments || [];
    return {
      post: result,
      comments: (comments || []).map((c) => ({
        author: c.author || '',
        content: c.content || '',
      })),
    };
  }
}
