# 🚀 NestJS 게시판 (BBS) 프로젝트

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  NestJS, MongoDB, Handlebars를 사용한 풀스택 게시판 애플리케이션
</p>

## 📋 프로젝트 개요

이 프로젝트는 NestJS 프레임워크 + MongoDB를 기반으로 구축된 기초적인 게시판(Bulletin Board System) 애플리케이션입니다. 게시글 CRUD 기능과 댓글 시스템을 구현하며, Handlebars 템플릿 엔진을 사용하여 서버 사이드 렌더링을 구현해 봤습니다..

## ✨ 주요 기능

### 게시글 관리
- ✅ 게시글 목록 조회
  1. `search` query를 이용해 제목 검색 가능
  2. Pagination 기능 구현
- ✅ 게시글 상세 조회
- ✅ 게시글 작성
- ✅ 게시글 수정
- ✅ 게시글 삭제

### 댓글 시스템
- ✅ 댓글 작성
- ✅ 댓글 삭제

### UI/UX
- � Handlebars 템플릿을 활용한 서버 사이드 렌더링
- 🎨 반응형 디자인
- 📄 페이지네이션

## 🛠 기술 스택

### Backend
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7
- **Database**: MongoDB (Mongoose 8.x)
- **Template Engine**: Handlebars (HBS)
- **Validation**: class-validator

### DevOps & Tools
- **Testing**: Jest
- **Linting**: ESLint
- **Code Formatting**: Prettier

## � 프로젝트 구조

```
backend/
├── src/
│   ├── app.controller.ts       # 뷰 렌더링 컨트롤러
│   ├── app.module.ts            # 루트 모듈
│   ├── main.ts                  # 애플리케이션 진입점
│   ├── dto/                     # 데이터 전송 객체
│   │   ├── commentRequest.dto.ts
│   │   ├── postPagination.dto.ts
│   │   ├── postRequest.dto.ts
│   │   └── postResponse.dto.ts
│   └── posts/                   # 게시글 모듈
│       ├── comment.service.ts   # 댓글 서비스
│       ├── posts.controller.ts  # API 컨트롤러
│       ├── posts.module.ts      # 게시글 모듈
│       ├── posts.service.ts     # 게시글 서비스
│       └── schemas/
│           └── post.schema.ts   # MongoDB 스키마
├── views/                       # Handlebars 템플릿
│   ├── layouts/
│   │   ├── main.hbs            # 메인 레이아웃
│   │   └── partials/           # 페이지 파셜
│   │       ├── detail.hbs      # 게시글 상세 페이지
│   │       ├── home.hbs        # 홈 페이지
│   │       ├── list.hbs        # 게시글 목록 페이지
│   │       └── write.hbs       # 게시글 작성 페이지
│   └── public/
│       └── main.css            # 스타일시트
└── test/                        # 테스트 파일
```

## 🚀 시작하기

### 필수 요구사항

- Node.js (v18 이상)
- npm 또는 yarn
- MongoDB (로컬 또는 MongoDB Atlas)

### 설치

```bash
# 의존성 설치
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
MONGO_URI=mongodb://localhost:27017/nest-bbs
PORT=3000
```

### 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 모드
npm run start:prod

# 디버그 모드
npm run start:debug
```

애플리케이션은 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 📡 API 엔드포인트

### 게시글 API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/api/posts` | 게시글 목록 조회 | `page`, `limit`, `search` |
| GET | `/api/posts/:id` | 게시글 상세 조회 | - |
| POST | `/api/posts` | 게시글 작성 | - |
| PUT | `/api/posts/:id` | 게시글 수정 | - |
| DELETE | `/api/posts/:id` | 게시글 삭제 | - |

#### Request Body (게시글 작성/수정)

```json
{
  "title": "게시글 제목",
  "author": "작성자",
  "content": "게시글 내용"
}
```

### 댓글 API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts/:id/comments` | 댓글 작성 |
| DELETE | `/api/posts/:id/comments/:index` | 댓글 삭제 |

#### Request Body (댓글 작성)

```json
{
  "author": "댓글 작성자",
  "content": "댓글 내용"
}
```

### 뷰 라우트

| Route | Description |
|-------|-------------|
| `/` | 홈 페이지 (최근 게시글 3개) |
| `/posts` | 게시글 목록 페이지 |
| `/posts/write` | 게시글 작성 페이지 |
| `/posts/:id` | 게시글 상세 페이지 |

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov

# 테스트 (watch 모드)
npm run test:watch

# 디버그 모드로 테스트
npm run test:debug
```

## 🔧 개발 도구

```bash
# 코드 포맷팅
npm run format

# 린팅 및 자동 수정
npm run lint
```

## 📝 데이터 스키마

### Post Schema

```typescript
{
  _id: ObjectId;        // MongoDB 자동 생성
  title: string;        // 게시글 제목 (필수)
  author: string;       // 작성자
  content: string;      // 게시글 내용
  comments: Comment[];  // 댓글 배열
  createdAt: Date;      // 생성일 (자동)
  updatedAt: Date;      // 수정일 (자동)
}
```

### Comment Schema

```typescript
{
  content: string;      // 댓글 내용 (필수)
  author: string;       // 작성자 (필수)
  createdAt: Date;      // 생성일 (자동)
}
```

## 🎯 주요 기술 구현

### 1. Handlebars 템플릿 엔진 설정

`main.ts`에서 Handlebars 엔진을 설정하고 커스텀 헬퍼 함수를 등록했습니다:

- **비교 헬퍼**: `gt`, `lt`, `gte`, `lte`, `eq`, `ne`
- **증감 헬퍼**: `inc`, `dec`

### 2. MongoDB 연동

`@nestjs/mongoose`를 사용하여 MongoDB와 연동하고, 환경 변수를 통해 설정을 관리합니다.

### 3. 페이지네이션

게시글 목록 조회 시 페이지네이션을 지원하며, 이전/다음 페이지 존재 여부를 포함한 메타데이터를 반환합니다.

### 4. 검색 기능

게시글 제목으로 검색할 수 있는 기능을 제공합니다.

## 📖 학습 포인트

이 프로젝트를 통해 다음을 학습할 수 있습니다:

- ✅ NestJS의 모듈 시스템 및 의존성 주입 (DI)
- ✅ 컨트롤러-서비스 패턴
- ✅ MongoDB와 Mongoose를 사용한 데이터베이스 연동
- ✅ DTO를 활용한 데이터 유효성 검증
- ✅ Handlebars를 사용한 서버 사이드 렌더링
- ✅ RESTful API 설계
- ✅ 페이지네이션 구현
- ✅ 환경 변수 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## � 라이선스

이 프로젝트는 개인 학습용으로 제작되었습니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

<p align="center">
  Built with ❤️ using <a href="https://nestjs.com/">NestJS</a>
</p>
