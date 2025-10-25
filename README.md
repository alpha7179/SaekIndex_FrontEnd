# 색인(SaekIn) 프론트엔드

React와 Vite를 기반으로 한 감정 분석 및 시각화 웹 애플리케이션의 프론트엔드입니다.

## ✨ 주요 기능

- 📋 **감정 설문조사**: 사용자의 감정 데이터를 수집하는 인터랙티브 설문 폼
- 📊 **데이터 시각화**: Chart.js와 D3.js를 활용한 다양한 차트와 히트맵
- 🌐 **다국어 지원**: 한국어/영어 지원 (react-i18next)
- 📱 **반응형 디자인**: 모바일과 데스크톱 모든 환경에서 최적화
- 🎨 **감정 기반 UI**: Emotion을 활용한 동적 스타일링
- ⚡ **실시간 데이터**: React Query를 통한 효율적인 데이터 관리

## 🛠️ 기술 스택

### 핵심 프레임워크

- **React 19** - 최신 React 기능 활용
- **Vite** - 빠른 개발 서버와 빌드 도구
- **React Router v7** - 클라이언트 사이드 라우팅

### 상태 관리 & 데이터

- **@tanstack/react-query** - 서버 상태 관리
- **React Hook Form** - 폼 상태 관리 및 유효성 검사
- **Axios** - HTTP 클라이언트

### 스타일링

- **@emotion/react & @emotion/styled** - CSS-in-JS 스타일링
- **React Icons** - 아이콘 라이브러리

### 시각화

- **Chart.js & react-chartjs-2** - 차트 라이브러리 (Chart.js v4.5.0, react-chartjs-2 v5.3.0)
- **D3.js** - 커스텀 데이터 시각화 (히트맵)
- **chartjs-adapter-moment** - 시간 축 어댑터

### 국제화 & UX

- **react-i18next** - 다국어 지원
- **react-toastify** - 알림 메시지
- **react-spinners** - 로딩 인디케이터

## 🚀 시작하기

### 전체 개발 환경 구축 가이드

#### 1. 시스템 요구사항

- **Node.js**: v18.0.0 이상 (권장: v20 LTS)
- **npm**: v8.0.0 이상
- **Git**: 최신 버전

#### 2. 프로젝트 클론 및 설정

```bash
# 저장소 클론
git clone <repository-url>
cd FrontEnd

# Node.js 버전 확인
node --version  # v18+ 필요

# npm 버전 확인
npm --version   # v8+ 필요
```

### 1. 의존성 설치

```bash
# 패키지 설치
npm install

# 설치 확인
npm list --depth=0
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 API 서버 주소 (개발 환경)
VITE_API_BASE_URL=http://localhost:4000

# API 인증을 위한 시크릿 키 (선택사항)
VITE_API_SECRET_KEY=your_secret_key_here
```

또는 `.env.example` 파일을 복사하여 사용:

```bash
# .env.example 파일을 .env로 복사
cp .env.example .env

# 필요에 따라 값 수정
nano .env
```

#### 환경 변수 설명

- **VITE_API_BASE_URL**: 백엔드 API 서버의 기본 URL
  - 개발 환경: `http://localhost:4000`
  - 프로덕션 환경: 실제 배포된 백엔드 서버 주소
- **VITE_API_SECRET_KEY**: API 요청 시 사용할 인증 키 (현재 미사용)

#### 환경별 설정 예시

**개발 환경 (.env.development)**

```env
VITE_API_BASE_URL=http://localhost:4000
```

**프로덕션 환경 (.env.production)**

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

> ⚠️ **중요**:
>
> - `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
> - 팀원들과 공유할 때는 `.env.example` 파일을 참고하세요
> - Vite에서는 `VITE_` 접두사가 붙은 환경 변수만 클라이언트에서 접근 가능합니다

### 3. 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

#### 백엔드 연동 확인

프론트엔드가 정상적으로 작동하려면 백엔드 서버가 실행 중이어야 합니다:

1. **백엔드 서버 실행 확인**

   ```bash
   # 백엔드 서버가 http://localhost:4000에서 실행 중인지 확인
   curl http://localhost:4000/api/health
   ```

2. **CORS 설정 확인**

   - 백엔드에서 `http://localhost:5173` 도메인을 허용하도록 CORS 설정 필요
   - 개발 환경에서는 모든 도메인(`*`) 허용 권장

3. **API 연결 테스트**
   - 브라우저 개발자 도구 → Network 탭에서 API 요청 상태 확인
   - 설문 제출 시 `/api/surveys` 엔드포인트로 POST 요청 전송됨

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# ESLint 검사
npm run lint
```

## 📁 프로젝트 구조

```
FrontEnd/
├── public/                   # 정적 파일
│   ├── locales/             # 다국어 번역 파일
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── ko/
│   │       └── translation.json
│   └── image/               # 이미지 파일
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Footer.jsx       # 푸터 컴포넌트
│   │   ├── FormField.jsx    # 폼 필드 컴포넌트
│   │   ├── GradientIcon.jsx # 그라디언트 아이콘
│   │   ├── Header.jsx       # 헤더 네비게이션
│   │   ├── HeatmapChart.jsx # D3.js 히트맵 차트
│   │   ├── NotFound.jsx     # 404 페이지
│   │   ├── PageHeader.jsx   # 페이지 헤더
│   │   ├── SurveyEditForm.jsx # 설문 편집 폼
│   │   └── SurveyForm.jsx   # 설문 작성 폼
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── HomePage.jsx     # 메인 페이지
│   │   ├── AnalyzePage.jsx  # 설문 분석 페이지
│   │   ├── VisualizationPage.jsx # 시각화 페이지
│   │   ├── AdminPage.jsx    # 관리자 페이지
│   │   └── StatsPage.jsx    # 통계 페이지
│   ├── services/            # API 서비스
│   │   └── api.jsx          # Axios 기반 API 클라이언트
│   ├── data/                # 정적 데이터
│   │   ├── survey.ko.json   # 한국어 설문 데이터
│   │   └── survey.en.json   # 영어 설문 데이터
│   ├── styles/              # 글로벌 스타일
│   │   └── GlobalStyles.jsx # Emotion 글로벌 스타일
│   ├── assets/              # 정적 자원
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── main.jsx             # 애플리케이션 진입점
│   ├── i18n.js              # 국제화 설정
│   ├── App.css              # 앱 스타일
│   └── index.css            # 기본 스타일
├── index.html               # HTML 템플릿
├── vite.config.js           # Vite 설정
├── eslint.config.js         # ESLint 설정
└── package.json             # 프로젝트 설정
```

## 🎯 주요 컴포넌트 설명

### 📄 페이지 컴포넌트

- **HomePage**: 메인 랜딩 페이지, 서비스 소개 및 네비게이션
- **AnalyzePage**: 감정 설문조사 페이지, 동적 폼 생성
- **VisualizationPage**: 감정 데이터 시각화 결과 페이지
- **AdminPage**: 설문 데이터 관리 및 CRUD 기능
- **StatsPage**: 통계 대시보드, 다양한 차트와 히트맵

### 🧩 재사용 컴포넌트

- **SurveyForm**: 동적 설문 폼, React Hook Form 기반
- **HeatmapChart**: D3.js 기반 커스텀 히트맵 차트
- **FormField**: 범용 폼 필드 컴포넌트 (input, select, radio, checkbox 등)
- **Header/Footer**: 공통 레이아웃 컴포넌트

### 🔧 유틸리티

- **api.jsx**: Axios 기반 API 클라이언트, 백엔드와의 통신
- **i18n.js**: react-i18next 설정, 다국어 지원
- **GlobalStyles.jsx**: Emotion 기반 글로벌 스타일

## 🌐 다국어 지원

### 지원 언어

- 🇰🇷 한국어 (기본)
- 🇺🇸 영어

### 번역 파일 위치

- `public/locales/ko/translation.json` - 한국어 번역
- `public/locales/en/translation.json` - 영어 번역

### 사용법

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
    </div>
  );
}
```

## 📊 데이터 시각화

### Chart.js 차트

- **Bar Chart**: 연령대별 분포, 문항별 응답 비율
- **Line Chart**: 시간별 설문 제출 추이
- **Doughnut Chart**: 카테고리별 비율

### D3.js 커스텀 차트

- **Heatmap**: 날짜/시간대별 설문 제출 패턴 시각화

### 사용 예시

```jsx
import { Bar } from 'react-chartjs-2';
import HeatmapChart from '../components/HeatmapChart';

// Chart.js 사용
<Bar data={chartData} options={options} />

// D3.js 커스텀 차트 사용
<HeatmapChart data={heatmapData} />
```

## 🎨 스타일링 가이드

### Emotion 사용법

```jsx
import styled from "@emotion/styled";

const StyledButton = styled.button`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;

  &:hover {
    transform: scale(1.05);
  }
`;
```

### 색상 팔레트

- **Primary**: `#b84182ff` (핑크)
- **Secondary**: `#ddc9bfff` (베이지)
- **Accent**: `#F8EBE4` (연한 핑크)
- **Text**: `#333d4b` (다크 그레이)

## 🔄 상태 관리

### React Query 사용

```jsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { surveyAPI } from "../services/api";

// 데이터 조회
const { data, isLoading, error } = useQuery({
  queryKey: ["surveys"],
  queryFn: surveyAPI.getSurveys,
});

// 데이터 변경
const mutation = useMutation({
  mutationFn: surveyAPI.createSurvey,
  onSuccess: () => {
    // 성공 처리
  },
});
```

## 🚀 배포

### 배포 전 준비사항

1. **환경 변수 설정**

   ```bash
   # 프로덕션용 .env 파일 생성
   VITE_API_BASE_URL=https://your-backend-domain.com
   ```

2. **빌드 테스트**
   ```bash
   npm run build
   npm run preview  # 빌드 결과 미리보기
   ```

### AWS S3 + CloudFront 배포

1. **빌드 생성**

   ```bash
   npm run build
   ```

2. **S3 버킷 설정**

   - 정적 웹사이트 호스팅 활성화
   - 인덱스 문서: `index.html`
   - 오류 문서: `index.html` (SPA 라우팅용)

3. **S3 업로드**

   ```bash
   # AWS CLI 사용
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **CloudFront 설정**

   - 오류 페이지 설정: 404 → `/index.html` (SPA 라우팅용)
   - 캐시 정책: CSS/JS 파일은 장기 캐시, HTML은 단기 캐시

5. **캐시 무효화**
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### Netlify 배포

1. **자동 배포 (권장)**

   - GitHub 저장소 연결
   - 빌드 명령어: `npm run build`
   - 배포 디렉토리: `dist`
   - 환경 변수 설정: Netlify 대시보드에서 설정

2. **수동 배포**

   ```bash
   # Netlify CLI 설치 및 배포
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **리다이렉트 설정**
   ```bash
   # public/_redirects 파일 생성 (SPA 라우팅용)
   /*    /index.html   200
   ```

### Vercel 배포

```bash
# Vercel CLI 사용
npm install -g vercel
vercel --prod
```

### 배포 후 확인사항

- [ ] 모든 페이지 정상 로드 확인
- [ ] API 연결 상태 확인
- [ ] 다국어 전환 기능 확인
- [ ] 차트 렌더링 확인
- [ ] 모바일 반응형 확인

## 🔧 개발 도구

### ESLint 설정

- React Hooks 규칙
- React Refresh 플러그인
- 최신 JavaScript 문법 지원
- 설정 파일: `eslint.config.js`

```bash
# ESLint 검사 실행
npm run lint

# 자동 수정 가능한 오류 수정
npm run lint -- --fix
```

### Vite 설정

- React SWC 플러그인 사용 (빠른 컴파일)
- 빠른 HMR (Hot Module Replacement)
- 최적화된 번들링
- 설정 파일: `vite.config.js`

```bash
# 개발 서버 (HMR 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 개발 워크플로우

1. **코드 작성**

   ```bash
   # 기능 브랜치 생성
   git checkout -b feature/new-feature

   # 개발 서버 실행
   npm run dev
   ```

2. **코드 품질 검사**

   ```bash
   # ESLint 검사
   npm run lint

   # 빌드 테스트
   npm run build
   ```

3. **커밋 및 푸시**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

## 🐛 문제 해결

### 자주 발생하는 문제

1. **CORS 에러**

   ```
   Access to fetch at 'http://localhost:4000/api/surveys' from origin 'http://localhost:5173' has been blocked by CORS policy
   ```

   **해결 방법:**

   - 백엔드 서버가 실행 중인지 확인: `curl http://localhost:4000`
   - `VITE_API_BASE_URL` 환경 변수가 올바른지 확인
   - 백엔드 CORS 설정에서 `http://localhost:5173` 허용 확인

2. **번역 파일 로드 실패**

   ```
   Failed to load resource: the server responded with a status of 404 (Not Found)
   ```

   **해결 방법:**

   - `public/locales/ko/translation.json` 파일 존재 확인
   - `public/locales/en/translation.json` 파일 존재 확인
   - 브라우저 개발자 도구 → Network 탭에서 번역 파일 요청 상태 확인
   - JSON 파일 문법 오류 확인 (쉼표, 따옴표 등)

3. **차트 렌더링 문제**

   ```
   Cannot read properties of undefined (reading 'data')
   ```

   **해결 방법:**

   - Chart.js 버전 호환성 확인 (현재 v4.5.0 사용)
   - 차트 데이터 형식이 올바른지 확인
   - `chartjs-adapter-moment` 설치 확인 (시간 축 차트용)
   - 백엔드에서 올바른 데이터 형식 반환 확인

4. **환경 변수 인식 안됨**

   ```
   VITE_API_BASE_URL is undefined
   ```

   **해결 방법:**

   - `.env` 파일이 프로젝트 루트에 있는지 확인
   - 환경 변수명이 `VITE_` 접두사로 시작하는지 확인
   - 개발 서버 재시작: `npm run dev`

5. **의존성 설치 오류**

   ```
   npm ERR! peer dep missing
   ```

   **해결 방법:**

   - Node.js 버전 확인 (권장: v18 이상)
   - 캐시 삭제 후 재설치:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

### 디버깅 팁

- **개발자 도구 활용**: F12 → Console/Network 탭에서 오류 확인
- **API 응답 확인**: Postman이나 curl로 백엔드 API 직접 테스트
- **로그 확인**: `console.log`를 활용한 데이터 흐름 추적

## 📝 개발 가이드라인

### 컴포넌트 작성 규칙

- 함수형 컴포넌트 사용
- Hooks 활용 (useState, useEffect, custom hooks)
- PropTypes 또는 TypeScript 타입 정의 권장

### 파일 명명 규칙

- 컴포넌트: PascalCase (예: `SurveyForm.jsx`)
- 유틸리티: camelCase (예: `api.jsx`)
- 상수: UPPER_SNAKE_CASE

### 코드 스타일

- ESLint 규칙 준수
- Prettier 포맷팅 권장
- 의미있는 변수명과 함수명 사용

---

## 🔧 전체 소스 코드

### 1. 루트 파일들

#### 1-1. package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "chart.js": "^4.5.0",
    "chartjs-adapter-moment": "^1.0.1",
    "chartjs-chart-matrix": "^3.0.0",
    "d3": "^7.9.0",
    "i18next": "^25.5.2",
    "i18next-http-backend": "^3.0.2",
    "moment": "^2.30.1",
    "node-fetch": "^2.7.0",
    "react": "^19.1.1",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-i18next": "^16.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

#### 1-2. vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

#### 1-3. eslint.config.js

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
```

#### 1-4. index.html

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="image/icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="감정을 통한 예술을 경험하세요" />
    <title>색인 SaekIn</title>
  </head>
  <body>
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>

    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 2. src/ 폴더

#### 2-1. 메인 파일들

##### 2-1-1. src/main.jsx

```jsx
/* src/main.jsx */
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </React.StrictMode>
);
```

##### 2-1-2. src/App.jsx

```jsx
/* src/App.jsx */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import VisualizationPage from "./pages/VisualizationPage";
import AdminPage from "./pages/AdminPage";
import StatsPage from "./pages/StatsPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Styles
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/visualization" element={<VisualizationPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/stats" element={<StatsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="light"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

##### 2-1-3. src/i18n.js

```js
/* src/i18n.js */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: "ko",
    fallbackLng: "ko",

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

##### 2-1-4. src/index.css

```css
/* src/index.css */

@font-face {
  font-family: "ChangwonDanggamAsak";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff")
    format("woff");
  font-weight: normal;
  font-display: swap;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
```

##### 2-1-5. src/App.css

```css
/* src/App.css */

/* default style */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  background: #f5f5f5;
  color: #333;
}

/* layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

/* button style */
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* form style */
input,
select,
textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* footer style */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* loading style */
.loading {
  text-align: center;
  padding: 2rem;
}

/* error style */
.error {
  color: red;
  padding: 1rem;
  text-align: center;
}
```

#### 2-2. src/styles/

##### 2-2-1. src/styles/GlobalStyles.jsx

```jsx
/** src/styles/GlobalStyles.jsx */
/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }

      ul {
        list-style: none;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;
```

#### 2-3. src/services/

##### 2-3-1. src/services/api.jsx

```jsx
// src/services/api.jsx
import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({ baseURL: API_BASE_URL });

export const surveyAPI = {
  createSurvey: async (payload) => {
    const response = await api.post("/api/surveys", payload);
    return response.data;
  },
  getSurveys: async (page = 1) => {
    const response = await api.get("/api/surveys", { params: { page } });
    return response.data;
  },
  updateSurvey: async (id, payload) => {
    const response = await api.put(`/api/surveys/${id}`, payload);
    return response.data;
  },
  deleteSurvey: async (id) => {
    const response = await api.delete(`/api/surveys/${id}`);
    return response.status;
  },
  getSurveyStats: async () => {
    const response = await api.get("/api/surveys/stats");
    return response.data;
  },
};
```

---

#### 2-4. src/components/

##### 2-4-1. src/components/Footer.jsx

```jsx
/* src/components/Footer.jsx */
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  background-color: #f9fafb; /* 매우 옅은 회색 배경 */
  color: #6b7280; /* 기본 텍스트 색상 */
  font-size: 0.875rem;
  padding: 3rem 2rem;
  border-top: 1px solid #f0f0f0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 화면이 작아지면 줄바꿈 */
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e8eb;
`;

const Column = styled.div`
  flex: 1;
  min-width: 150px; /* 컬럼의 최소 너비 */
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333d4b;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LinkItem = styled.li`
  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoSection = styled.div`
  padding-top: 2rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const FooterLogo = styled.strong`
  font-family: "ChangwonDanggamAsak", sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 1.5rem; /* 폰트 크기 살짝 키우기 (선택 사항) */
`;

function Footer() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <ColumnsWrapper>
          <Column>
            <ColumnTitle>{t("footer.menuname")}</ColumnTitle>
            <LinkList>
              <LinkItem>
                <a href="/">{t("menu.home")}</a>
              </LinkItem>
              <LinkItem>
                <a href="/analyze">{t("menu.analyze")}</a>
              </LinkItem>
              <LinkItem>
                <a href="/visualization">{t("menu.visualization")}</a>
              </LinkItem>
            </LinkList>
          </Column>
        </ColumnsWrapper>

        <InfoSection>
          <strong>
            <FooterLogo>색인</FooterLogo> {t("footer.projectname")}
          </strong>{" "}
          <br />© 2025 SaekIn Proj. All Rights Reserved.
        </InfoSection>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
```

##### 2-4-2. src/components/FormField.jsx

```jsx
/* src/components/FormField.jsx */
import React from "react";
import styled from "@emotion/styled";

const FormGroup = styled.div`
  margin-bottom: 2.5rem;
`;
const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: ${(props) =>
    props.type === "radio" || props.type === "checkbox" ? "1rem" : "0.5rem"};
`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  &[type="range"] {
    padding: 0;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;
const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;
const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
`;
const RequiredMark = styled.span`
  color: red;
  margin-left: 0.25rem;
`;
const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const NumberInput = styled(Input)`
  width: 80px;
  text-align: center;
`;

const FormField = ({
  label,
  name,
  type,
  register,
  errors,
  options,
  validation,
  min,
  max,
  watch,
  setValue,
  readOnly,
  ...rest
}) => {
  const validationRules = { ...validation };
  if (min !== undefined) {
    validationRules.min = {
      value: min,
      message: `최소 ${min} 이상이어야 합니다.`,
    };
  }
  if (max !== undefined) {
    validationRules.max = {
      value: max,
      message: `최대 ${max} 이하여야 합니다.`,
    };
  }

  const watchedValue = watch ? watch(name) : undefined;

  return (
    <FormGroup>
      <Label htmlFor={name} type={type}>
        {label}
        {validation?.required && <RequiredMark>*</RequiredMark>}
      </Label>

      {(() => {
        switch (type) {
          case "range":
            return (
              <RangeContainer>
                <Input
                  id={name}
                  type="range"
                  min={min}
                  max={max}
                  {...register(name, validationRules)}
                  {...rest}
                  disabled={readOnly}
                />
                <NumberInput
                  type="number"
                  min={min}
                  max={max}
                  value={watchedValue === undefined ? "" : watchedValue}
                  onChange={(e) => {}}
                  disabled={readOnly}
                />
              </RangeContainer>
            );
          case "textarea":
            return (
              <Textarea
                id={name}
                {...register(name, validationRules)}
                {...rest}
                disabled={readOnly}
              />
            );
          case "select":
            return (
              <Select
                id={name}
                {...register(name, validationRules)}
                {...rest}
                disabled={readOnly}
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            );
          case "radio":
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {options.map((option) => (
                  <OptionWrapper key={option.value}>
                    <input
                      type="radio"
                      value={option.value}
                      {...register(name, validationRules)}
                      disabled={readOnly}
                    />
                    <span>{option.label}</span>
                  </OptionWrapper>
                ))}
              </div>
            );
          case "checkbox":
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {options.map((option) => (
                  <OptionWrapper key={option.value}>
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register(name, validationRules)}
                      disabled={readOnly}
                    />
                    <span>{option.label}</span>
                  </OptionWrapper>
                ))}
              </div>
            );
          default:
            return (
              <Input
                id={name}
                type={type}
                {...register(name, validationRules)}
                {...rest}
                disabled={readOnly}
              />
            );
        }
      })()}

      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;
```

##### 2-4-3. src/components/GradientIcon.jsx

```jsx
/* src/components/GradientIcon.jsx */
import React from "react";

const GradientIcon = ({ icon, id }) => {
  const IconComponent = icon;

  return (
    <svg width="3rem" height="3rem" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#b84182ff" }} />
          <stop offset="100%" style={{ stopColor: "#F8EBE4" }} />
        </linearGradient>
      </defs>
      <IconComponent fill={`url(#${id})`} size="100%" />
    </svg>
  );
};

export default GradientIcon;
```

##### 2-4-4. src/components/Header.jsx

````jsx
/* src/components/Header.jsx */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #f0f0f0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333d4b;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: #4e5968;
  padding: 0.5rem;

  &.active {
    color: #b84182ff;
  }

  &:hover {
    color: #c777a3ff;
  }
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4e5968;
`;

const LangButton = styled.span`
  cursor: pointer;
  padding: 0.25rem;
  color: ${(props) =>
    props.active ? "#333d4b" : "#b0b8c1"};
`;

const Separator = styled.div`
  width: 1px;
  height: 12px;
  background-color: #e5e8eb;
`;

const HeaderLogo = styled.strong`
  font-family: "ChangwonDanggamAsak", sans-serif;
  font-weight: normal;
  font-size: 2rem;

  background: linear-gradient(135deg, #b84182ff 0%, #f8ebe4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <HeaderContainer>
      <Logo to="/">
        <HeaderLogo>색인</HeaderLogo>
      </Logo>

      <Nav>
        <NavLink to="/" className={isActive("/")}>
          {t("menu.home")}
        </NavLink>
        <NavLink to="/analyze" className={isActive("/analyze")}>
          {t("menu.analyze")}
        </NavLink>
        <NavLink to="/visualization" className={isActive("/visualization")}>
          {t("menu.visualization")}
        </NavLink>
      </Nav>

      <LangSwitcher>
        <LangButton
          active={i18n.language === "ko"}
          onClick={() => changeLanguage("ko")}
        >
          KOR
        </LangButton>
        <Separator />
        <LangButton
          active={i18n.language === "en"}
          onClick={() => changeLanguage("en")}
        >
          ENG
        </LangButton>
      </LangSwitcher>
    </HeaderContainer>
  );
}

export default Header;
```#####
2-4-5. src/components/NotFound.jsx

```jsx
/* src/components/NotFound.jsx */
import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  transition: background 0.3s;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
`;

function NotFound() {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Icon />
      <Title>{t("NotFound.title")}</Title>
      <Message>{t("NotFound.message")}</Message>
      <HomeLink to="/">{t("NotFound.button")}</HomeLink>
    </Container>
  );
}

export default NotFound;
````

##### 2-4-6. src/components/PageHeader.jsx

```jsx
/* src/components/PageHeader.jsx */
import React from "react";
import styled from "@emotion/styled";

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

function PageHeader({ icon, title, subtitle }) {
  return (
    <HeaderContainer>
      <Title>
        {icon && <span>{icon}</span>}
        {title}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeaderContainer>
  );
}

export default PageHeader;
```

##### 2-4-7. src/components/SurveyEditForm.jsx

```jsx
// src/components/SurveyEditForm.jsx
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormField from "./FormField";
import surveyKO from "../data/survey.ko.json";
import surveyEN from "../data/survey.en.json";

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;
const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;
const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyEditForm({
  selectedSurvey,
  onSubmit,
  onReset,
  isSubmitting,
  isReadOnly,
}) {
  const { i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const surveyData = surveys[i18n.language] || surveys.ko;

  useEffect(() => {
    if (selectedSurvey) {
      surveyData.forEach((field) => {
        let value = selectedSurvey[field.name] || "";
        if (field.name === "date" && value) {
          value = new Date(value).toISOString().split("T")[0];
        }
        setValue(field.name, value);
      });
    } else {
      reset();
    }
  }, [selectedSurvey, setValue, reset, surveyData]);

  return (
    <Panel>
      <h3>
        {selectedSurvey ? `${selectedSurvey.name}님의 설문 상세` : "항목 선택"}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {surveyData.map((field) => (
          <FormField
            key={field.name}
            readOnly={isReadOnly || field.readOnly}
            type={field.type}
            name={field.name}
            label={field.label}
            register={register}
            errors={errors}
            options={field.options}
            validation={{}}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            watch={watch}
            setValue={setValue}
          />
        ))}

        {!isReadOnly && (
          <Actions>
            <Button type="submit" disabled={isSubmitting || !selectedSurvey}>
              수정하기
            </Button>
            <Button type="button" onClick={onReset}>
              폼 초기화
            </Button>
          </Actions>
        )}
      </form>
    </Panel>
  );
}

export default SurveyEditForm;
```

##### 2-4-8. src/components/SurveyForm.jsx

```jsx
// src/components/SurveyForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import FormField from "./FormField";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import surveyKO from "../data/survey.ko.json";
import surveyEN from "../data/survey.en.json";
import { surveyAPI } from "../services/api";

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const surveyData = surveys[i18n.language] || surveys.ko;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { date: today, age: 25, question3: "" },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await surveyAPI.createSurvey(data);
      console.log("Server response:", result);
      toast.success("설문이 성공적으로 제출되었습니다!");
      reset();
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        <input type="hidden" name="form-name" value="survey-submit" />

        {surveyData.map((field) => (
          <FormField
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            register={register}
            errors={errors}
            options={field.options}
            validation={field.validation || {}}
            readOnly={field.readOnly}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            watch={watch}
            setValue={setValue}
          />
        ))}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("AnalyzePage.submitload") : t("AnalyzePage.submit")}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SurveyForm;
```

##### 2-4-9. src/components/HeatmapChart.jsx

````jsx
// src/components/HeatmapChart.jsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HeatmapChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    svg.selectAll("*").remove();

    const allDates = [...new Set(data.map((d) => d.date))];
    const xDomain = allDates;
    const x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .domain(xDomain)
      .padding(0.05);

    const allHours = [...new Set(data.map((d) => d.hour))];
    const yDomain = allHours.sort((a, b) => a - b);
    const y = d3
      .scaleBand()
      .range([height - margin.bottom, margin.top])
      .domain(yDomain)
      .padding(0.05);

    const maxCount = d3.max(data, (d) => d.count) || 1;
    const colorScale = d3.scaleSequential(
      [0, maxCount],
      d3.interpolate(d3.lab("white"), d3.lab("steelblue"))
    );

    svg
      .selectAll(".heatmap-cell")
      .data(data, (d) => d.date + ":" + d.hour)
      .enter()
      .append("rect")
      .attr("class", "heatmap-cell")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => y(d.hour))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => colorScale(d.count));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HeatmapChart;
```#### 2-5.
src/pages/

##### 2-5-1. src/pages/AdminPage.jsx

```jsx
//src/pages/AdminPage.jsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { surveyAPI } from "../services/api";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import SurveyEditForm from "../components/SurveyEditForm";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  th,
  td {
    border-bottom: 1px solid #eee;
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #fafafa;
  }
  tr:hover {
    background: #fafafa;
  }
`;
const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const Danger = styled(Button)`
  color: #ff4757;
  border-color: #ffb3ba;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;
const PageButton = styled.button`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${(props) => (props.isActive ? "#667eea" : "#ddd")};
  background: ${(props) => (props.isActive ? "#667eea" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;
const StatsButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background: #5a67d8;
  }
`;

function AdminPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["surveys", currentPage],
    queryFn: () => surveyAPI.getSurveys(currentPage),
    keepPreviousData: true,
  });

  const surveys = data?.data?.surveys || [];
  const totalPages = data?.data?.totalPages || 1;

  const deleteMutation = useMutation({
    mutationFn: (id) => surveyAPI.deleteSurvey(id),
    onSuccess: () => {
      toast.info("삭제 완료");
      queryClient.invalidateQueries({ queryKey: ["surveys", currentPage] });
      if (surveys.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setSelected(null);
    },
  });

  const onDelete = async (row) => {
    if (!confirm(`[삭제] '${row.name}'님의 설문을 삭제할까요?`)) return;
    await deleteMutation.mutateAsync(row._id);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <PageHeader
        icon="🗂️"
        title="설문 데이터 통합 관리"
        subtitle="사용자가 제출한 모든 설문 데이터를 관리합니다."
      />

      <TopActions>
        <StatsButton to="/admin/stats">통계 시각화 보기</StatsButton>
      </TopActions>

      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>제출일</th>
                <th>제출시간</th>
                <th>이름</th>
                <th>나이</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => {
                const submissionDate = new Date(s.createdAt);
                return (
                  <tr key={s._id}>
                    <td>{submissionDate.toLocaleDateString()}</td>
                    <td>{submissionDate.toLocaleTimeString()}</td>
                    <td>{s.name}</td>
                    <td>{s.age}세</td>
                    <td>
                      <Actions>
                        <Button onClick={() => setSelected(s)}>확인</Button>
                        <Danger onClick={() => onDelete(s)}>삭제</Danger>
                      </Actions>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <PaginationContainer>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PageButton>
            ))}
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </PageButton>
          </PaginationContainer>
        </Panel>

        <SurveyEditForm
          selectedSurvey={selected}
          onReset={() => setSelected(null)}
          isReadOnly={true}
        />
      </Grid>
    </Container>
  );
}

export default AdminPage;
````

##### 2-5-2. src/pages/AnalyzePage.jsx

```jsx
/* src/pages/AnalyzePage.jsx */
import React, { useState } from "react";
import styled from "@emotion/styled";
import SurveyForm from "../components/SurveyForm";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StartContainer = styled.div`
  text-align: center;
  padding: 0.5rem 1rem;
`;

function AnalyzePage() {
  const { t } = useTranslation();

  const [isSurveyStarted, setIsSurveyStarted] = useState(false);

  const handleStartSurvey = () => {
    setIsSurveyStarted(true);
  };

  return (
    <PageContainer>
      <PageHeader
        icon="📋"
        title={t("AnalyzePage.title")}
        subtitle={t("AnalyzePage.subtitle")}
      />
      {isSurveyStarted ? (
        <SurveyForm />
      ) : (
        <StartContainer>
          <StartButton onClick={handleStartSurvey}>
            {t("AnalyzePage.survaystart")}
          </StartButton>
        </StartContainer>
      )}
    </PageContainer>
  );
}

export default AnalyzePage;
```

##### 2-5-3. src/pages/HomePage.jsx

```jsx
/* src/pages/HomePage.jsx */
import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { FaPoll, FaChartBar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import GradientIcon from "../components/GradientIcon";
import PageHeader from "../components/PageHeader";

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin: 3rem auto 0;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

function HomePage() {
  const { t } = useTranslation();

  return (
    <HomeContainer>
      <PageHeader
        icon="😂"
        title={t("home.title")}
        subtitle={t("home.subtitle")}
      />

      <CardGrid>
        <Card to="/analyze">
          <div className="icon-container">
            <GradientIcon icon={FaPoll} id="poll-gradient" />
          </div>
          <h3>{t("home.card_analyze_title")}</h3>
          <p>{t("home.card_analyze_desc")}</p>
        </Card>
        <Card to="/visualization">
          <div className="icon-container">
            <GradientIcon icon={FaChartBar} id="chart-gradient" />
          </div>
          <h3>{t("home.card_viz_title")}</h3>
          <p>{t("home.card_viz_desc")}</p>
        </Card>
      </CardGrid>
    </HomeContainer>
  );
}

export default HomePage;
```

##### 2-5-4. src/pages/VisualizationPage.jsx

````jsx
/* src/pages/VisualizationPage.jsx */
import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";

const Container = styled.div`
  text-align: center;
  padding: 3rem;
`;

function VisualizationPage() {
  const { t } = useTranslation();
  return (
    <Container>
      <PageHeader
        icon="📊"
        title={t("VisualizationPage.title")}
        subtitle={t("VisualizationPage.subtitle")}
      />
    </Container>
  );
}

export default VisualizationPage;
```##### 2
-5-5. src/pages/StatsPage.jsx

```jsx
// src/pages/StatsPage.jsx
import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  TimeScale,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import { surveyAPI } from "../services/api";
import HeatmapChart from "../components/HeatmapChart";
import "chartjs-adapter-moment";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  TimeScale
);

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  max-width: 900px;
  margin: 0 auto 1.5rem auto;
  padding: 0 0rem;
`;
const StatsButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  &:hover {
    background: #5a67d8;
  }
`;

const StatsPage = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["surveyStats"],
    queryFn: surveyAPI.getSurveyStats,
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <p>통계 데이터를 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p>데이터를 불러오는 데 실패했습니다: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.totalSurveys) {
    return <p>표시할 데이터가 없습니다. 설문조사 데이터를 추가해주세요.</p>;
  }

  const stats = data.data;

  const dailyCounts = stats.dailyCount || [];
  const hourlyCounts = stats.hourlyCount || [];
  const ageDistributions = stats.ageDistribution || [];
  const q1Distributions = stats.question1Distribution || {};
  const q2Distributions = stats.question2Distribution || {};
  const q3Distributions = stats.question3Distribution || {};

  const heatmapData = stats.heatmapData || [];

  const dailyChartData = {
    labels: dailyCounts.map((item) => item.date),
    datasets: [
      {
        label: t("statsPage.daily_count_title"),
        data: dailyCounts.map((item) => item.count),
        borderColor: "#b84182ff",
        backgroundColor: "#b84182ff",
      },
    ],
  };

  const hourlyChartData = {
    labels: hourlyCounts.map((item) => `${item.hour}시`),
    datasets: [
      {
        label: t("statsPage.hourly_count_title"),
        data: hourlyCounts.map((item) => item.count),
        borderColor: "#ddc9bfff",
        backgroundColor: "#ddc9bfff",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const ageChartData = {
    labels: ageDistributions.map((item) => item.range),
    datasets: [
      {
        label: t("statsPage.age_distribution_title"),
        data: ageDistributions.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const q1ChartData = {
    labels: Object.keys(q1Distributions).sort(),
    datasets: [
      {
        label: t("statsPage.q1_title"),
        data: Object.values(q1Distributions),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const q2ChartData = {
    labels: Object.keys(q2Distributions).sort(),
    datasets: [
      {
        label: t("statsPage.q2_title"),
        data: Object.values(q2Distributions),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const q3ChartData = {
    labels: Object.keys(q3Distributions).sort(),
    datasets: [
      {
        label: t("statsPage.q3_title"),
        data: Object.values(q3Distributions),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <PageContainer>
      <PageHeader
        icon="📊"
        title={t("statsPage.title")}
        subtitle={t("statsPage.subtitle")}
      />
      <TopActions>
        <StatsButton to="/admin">관리자 페이지로 돌아가기</StatsButton>
      </TopActions>
      <Container>
        <ChartTitle>
          {t("statsPage.total_surveys", { count: stats.totalSurveys })}
        </ChartTitle>
        <ChartTitle>{t("statsPage.daily-hourly_heading")}</ChartTitle>
        {heatmapData.length > 0 ? (
          <HeatmapChart data={heatmapData} />
        ) : (
          <p>{t("statsPage.nodata")}</p>
        )}
        <Grid>
          <div>
            <ChartTitle>{t("statsPage.daily_count_heading")}</ChartTitle>
            {dailyCounts.length > 0 ? (
              <Line data={dailyChartData} />
            ) : (
              <p>{t("statsPage.nodata")}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t("statsPage.hourly_count_heading")}</ChartTitle>
            {hourlyCounts.length > 0 ? (
              <Line data={hourlyChartData} />
            ) : (
              <p>{t("statsPage.nodata")}</p>
            )}
          </div>
        </Grid>
        <hr />
        <ChartTitle>{t("statsPage.age_distribution_heading")}</ChartTitle>
        {ageDistributions.length > 0 ? (
          <Bar data={ageChartData} />
        ) : (
          <p>{t("statsPage.nodata")}</p>
        )}
        <hr />
        <Grid>
          <div>
            <ChartTitle>{t("statsPage.q1_heading")}</ChartTitle>
            {Object.keys(q1Distributions).length > 0 ? (
              <Bar data={q1ChartData} options={options} />
            ) : (
              <p>{t("statsPage.nodata")}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t("statsPage.q2_heading")}</ChartTitle>
            {Object.keys(q2Distributions).length > 0 ? (
              <Bar data={q2ChartData} options={options} />
            ) : (
              <p>{t("statsPage.nodata")}</p>
            )}
          </div>
          <div>
            <ChartTitle>{t("statsPage.q3_heading")}</ChartTitle>
            {Object.keys(q3Distributions).length > 0 ? (
              <Bar data={q3ChartData} options={options} />
            ) : (
              <p>{t("statsPage.nodata")}</p>
            )}
          </div>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default StatsPage;
````

#### 2-6. src/data/

##### 2-6-1. src/data/survey.en.json

```json
[
  {
    "name": "date",
    "label": "Date",
    "type": "date",
    "readOnly": true
  },
  {
    "name": "name",
    "label": "Name",
    "type": "text",
    "placeholder": "Please enter your name",
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "age",
    "label": "Age",
    "type": "range",
    "min": 1,
    "max": 100,
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question1",
    "label": "Question1",
    "type": "checkbox",
    "options": [
      { "value": "1", "label": "value1" },
      { "value": "2", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "4", "label": "value4" },
      { "value": "5", "label": "value5" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question2",
    "label": "Question2",
    "type": "radio",
    "options": [
      { "value": "1", "label": "value1" },
      { "value": "2", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "4", "label": "value4" },
      { "value": "5", "label": "value5" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question3",
    "label": "Question3",
    "type": "select",
    "options": [
      { "value": "", "label": "select", "disabled": true },
      { "value": "1", "label": "value1" },
      { "value": "2", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "4", "label": "value4" },
      { "value": "5", "label": "value5" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question4",
    "label": "Question4",
    "type": "textarea",
    "placeholder": "Please enter the text"
  }
]
```

##### 2-6-2. src/data/survey.ko.json

```json
[
  {
    "name": "date",
    "label": "날짜",
    "type": "date",
    "readOnly": true
  },
  {
    "name": "name",
    "label": "이름",
    "type": "text",
    "placeholder": "이름을 입력해주세요",
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "age",
    "label": "나이",
    "type": "range",
    "min": 1,
    "max": 100,
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question1",
    "label": "문항1",
    "type": "checkbox",
    "options": [
      { "value": "1", "label": "값1" },
      { "value": "2", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "4", "label": "값4" },
      { "value": "5", "label": "값5" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question2",
    "label": "문항2",
    "type": "radio",
    "options": [
      { "value": "1", "label": "값1" },
      { "value": "2", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "4", "label": "값4" },
      { "value": "5", "label": "값5" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question3",
    "label": "문항3",
    "type": "select",
    "options": [
      { "value": "", "label": "선택", "disabled": true },
      { "value": "1", "label": "값1" },
      { "value": "2", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "4", "label": "값4" },
      { "value": "5", "label": "값5" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question4",
    "label": "문항4",
    "type": "textarea",
    "placeholder": "자유롭게 의견을 남겨주세요."
  }
]
```

### 3. public/locales (다국어 번역 파일)

#### 3-1. public/locales/en/translation.json

```json
{
  "menu": {
    "home": "Home",
    "analyze": "Analyze",
    "visualization": "Visualization"
  },
  "home": {
    "title": "Data Analysis & Visualization",
    "subtitle": "Analyze data and check the results through our survey.",
    "card_analyze_title": "Start Emotion Analysis",
    "card_analyze_desc": "Go to the Analysis page and start emotion Analysis.",
    "card_viz_title": "View Emotion Visualization",
    "card_viz_desc": "Check the visualized results."
  },
  "AnalyzePage": {
    "title": "Emotion Analysis",
    "subtitle": "Please process the emotions for Emotion analysis.",
    "survaystart": "Start analysis",
    "submit": "Submit a survey",
    "submitload": "Submitting...",
    "success": "Survey submitted successfully!",
    "error": "An error occurred during submission."
  },
  "VisualizationPage": {
    "title": "Emotion Visualization",
    "subtitle": "Media art that visualizes emotions is created."
  },
  "footer": {
    "menuname": "Project",
    "projectname": "Project"
  },
  "NotFound": {
    "title": "404 - Page Not Found",
    "message": "The requested page does not exist.",
    "button": "Return to Home"
  },
  "statsPage": {
    "title": "Survey statistics",
    "subtitle": "Analyze and visualize survey data.",
    "nodata": "There is no data to display.",
    "daily-hourly_heading": "Number of survey submissions by date/time zone",
    "age_distribution_heading": "Survey Participant Distribution by Age Group",
    "total_surveys": "Total Survey Participants: {{count}}",
    "age_distribution_title": "Responses",
    "age_chart_title": "Distribution by Age Group",
    "daily_count_heading": "Survey Submissions by Date",
    "daily_count_title": "Responses",
    "hourly_count_heading": "Survey Submissions by Hour",
    "hourly_count_title": "Responses",
    "q1_heading": "Question 1 Response Rate",
    "q1_title": "Responses",
    "q2_heading": "Question 2 Response Rate",
    "q2_title": "Responses",
    "q3_heading": "Question 3 Response Rate",
    "q3_title": "Number of responses"
  }
}
```

#### 3-2. public/locales/ko/translation.json

```json
{
  "menu": {
    "home": "홈",
    "analyze": "분석",
    "visualization": "시각화"
  },
  "home": {
    "title": "데이터 분석 및 시각화",
    "subtitle": "설문조사를 통해 데이터를 분석하고 결과를 확인하세요.",
    "card_analyze_title": "감정 분석 시작",
    "card_analyze_desc": "감정 분석을 시작합니다.",
    "card_viz_title": "감정 시각화 확인",
    "card_viz_desc": "시각화 결과를 확인합니다."
  },
  "AnalyzePage": {
    "title": "감정 분석",
    "subtitle": "감정분석을 위해 설문을 진행해주세요.",
    "survaystart": "분석 시작하기",
    "submit": "설문 제출하기",
    "submitload": "제출 중...",
    "success": "설문이 성공적으로 제출되었습니다!",
    "error": "제출 중 오류가 발생했습니다."
  },
  "VisualizationPage": {
    "title": "감정 시각화",
    "subtitle": "감정을 시각화한 미디어아트가 생성됩니다."
  },
  "footer": {
    "menuname": "프로젝트",
    "projectname": "프로젝트"
  },
  "NotFound": {
    "title": "404 - 페이지를 찾을 수 없습니다",
    "message": "요청하신 페이지가 존재하지 않습니다.",
    "button": "홈으로 돌아가기"
  },
  "statsPage": {
    "title": "설문 통계",
    "subtitle": "설문 데이터를 분석하여 시각화합니다.",
    "nodata": "표시할 데이터가 없습니다.",
    "daily-hourly_heading": "날짜/시간대별 설문 제출 수",
    "age_distribution_heading": "연령대별 설문 참여자 분포",
    "total_surveys": "총 설문 참여자: {{count}}명",
    "age_distribution_title": "설문 참여자 수",
    "age_chart_title": "연령대별 분포",
    "daily_count_heading": "날짜별 설문 제출 수",
    "daily_count_title": "설문 참여자 수",
    "hourly_count_heading": "시간대별 설문 제출 수",
    "hourly_count_title": "설문 참여자 수",
    "q1_heading": "문항1 응답 비율",
    "q1_title": "설문 참여자 수",
    "q2_heading": "문항2 응답 비율",
    "q2_title": "설문 참여자 수",
    "q3_heading": "문항3 응답 비율",
    "q3_title": "설문 참여자 수"
  }
}
```

---

**색인(SaekIn) 프론트엔드** - 감정을 통한 예술적 경험을 제공하는 웹 애플리케이션 🎨

이제 FrontEnd 폴더에서 작업하는 개발자들이 이 README.md만 보고도 전체 프론트엔드 코드를 파악하고 개발을 시작할 수 있습니다!
