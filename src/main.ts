import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { engine } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 자산 폴더 설정
  app.useStaticAssets(join(__dirname, '..', 'views/public'));
  // 핸들바스 엔진 설정 (파셜 디렉토리 포함)
  app.engine(
    'hbs',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    engine({
      extname: '.hbs',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      partialsDir: join(__dirname, '..', 'views/layouts/partials'),
      defaultLayout: 'main',
      helpers: {
        // 비교 헬퍼
        gt: (a: number, b: number) => a > b,
        lt: (a: number, b: number) => a < b,
        gte: (a: number, b: number) => a >= b,
        lte: (a: number, b: number) => a <= b,
        eq: (a: any, b: any) => a === b,
        ne: (a: any, b: any) => a !== b,
        // 증감 헬퍼
        inc: (value: any) => parseInt(String(value)) + 1,
        dec: (value: any) => parseInt(String(value)) - 1,
      },
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
