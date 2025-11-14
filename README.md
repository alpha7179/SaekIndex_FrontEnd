# 색인(SaekIn) 프론트엔드

React와 Vite를 기반으로 한 **감정 분석 및 시각화 웹 애플리케이션**의 프론트엔드입니다.

## ✨ 주요 기능

- 📋 **웹캠 기반 감정 설문조사**: 8개 심리 평가 질문 + 실시간 웹캠 감정 분석
- 📊 **통계 시각화**: Chart.js와 D3.js를 활용한 다양한 차트
- 🗂️ **관리자 대시보드**: 설문 데이터 CRUD 및 페이지네이션
- 🎨 **감정 시각화 대기열**: 미감상 설문 관리 및 활성화
- 🌐 **다국어 지원**: 한국어/영어 (react-i18next)
- 📱 **반응형 디자인**: 모바일과 데스크톱 최적화

---

## 🛠️ 기술 스택

### 핵심
- **React 19.1.1** + **Vite 7.1.2** (SWC)
- **React Router v7** - 클라이언트 사이드 라우팅
- **TanStack Query v5** - 서버 상태 관리 및 캐싱
- **React Hook Form v7** - 폼 관리 및 유효성 검사
- **Axios** - HTTP 클라이언트

### 스타일링
- **Emotion** - CSS-in-JS 스타일링
- **React Icons** - 아이콘 라이브러리

### 시각화
- **Chart.js v4** + **react-chartjs-2** - 바/라인/파이 차트
- **chartjs-adapter-moment** - 시간 축 어댑터
- **chartjs-chart-matrix** - 매트릭스 차트
- **D3.js v7** - 커스텀 히트맵 시각화

### 국제화 & UX
- **react-i18next** + **i18next-http-backend** - 다국어 지원
- **react-toastify** - 알림 메시지
- **react-spinners** - 로딩 인디케이터

---

## 🚀 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone <repository-url>
cd SaekIndex_FrontEnd

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

프로젝트는 **환경별 자동 설정**을 사용합니다:

```
.env.development    # 개발 환경 (npm run dev 시 자동 사용)
.env.production     # 프로덕션 환경 (npm run build 시 자동 사용)
```

**개발 환경 (`.env.development`)**
```env
VITE_API_BASE_URL=
```
- 빈 문자열 = Vite 프록시 사용
- `localhost:5173/api/*` → 백엔드로 자동 전달

**프로덕션 환경 (`.env.production`)**
```env
VITE_API_BASE_URL=https://d114h2t0c1xjpp.cloudfront.net
```

> **참고:** Vite가 자동으로 환경에 맞는 파일을 선택하므로 `.env` 파일은 필요 없습니다.

### 3. 개발 서버 실행

```bash
npm run dev
# → http://localhost:5173
```

### 4. 빌드

```bash
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint 검사
```

---

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Layout 등)
│   ├── Header.jsx      # 헤더 (네비게이션, 언어 전환)
│   ├── Footer.jsx      # 푸터
│   ├── PageHeader.jsx  # 페이지 헤더
│   ├── SurveyForm.jsx  # 설문 폼 (감정 데이터 포함)
│   ├── SurveyResponseDisplay.jsx  # 설문 응답 표시
│   ├── HeatmapChart.jsx           # D3.js 히트맵
│   ├── FormField.jsx              # 폼 필드 컴포넌트
│   ├── GradientIcon.jsx           # 그라디언트 아이콘
│   ├── ErrorBoundary.jsx          # 에러 경계
│   └── NotFound.jsx               # 404 페이지
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.jsx    # 메인 페이지
│   ├── AnalyzePage.jsx # 감정 설문조사 (웹캠 분석)
│   ├── VisualizationPage.jsx # 감정 분석 대기열
│   ├── AdminPage.jsx   # 관리자 페이지
│   └── StatsPage.jsx   # 통계 대시보드
├── services/
│   └── api.jsx         # API 클라이언트 (surveyAPI, emotionAPI)
├── hooks/              # 커스텀 훅
│   ├── useLanguage.js  # 다국어 훅
│   └── usePagination.js # 페이지네이션 훅
├── utils/              # 유틸리티
│   └── env.js          # 환경 변수 유틸리티
├── constants/          # 상수
│   └── index.js        # API 엔드포인트, 설정값
├── styles/             # 글로벌 스타일
│   └── GlobalStyles.jsx
├── data/               # 정적 데이터
│   ├── survey.ko.json  # 한국어 설문 스키마
│   └── survey.en.json  # 영어 설문 스키마
├── App.jsx             # 앱 루트 컴포넌트
├── main.jsx            # 앱 엔트리 포인트
└── i18n.js             # 다국어 설정

public/
└── locales/            # 번역 파일
    ├── ko/translation.json
    └── en/translation.json
```

---

## 🎯 핵심 기능 설명

### 1. 웹캠 기반 감정 분석 (AnalyzePage)

**플로우:**
```
설문 시작 → 세션 생성 → 웹캠 활성화 → 3초마다 프레임 캡처 
→ 감정 분석 API 호출 → 벡터 전송 → 설문 완료 
→ 데이터 융합 → 최종 저장
```

**주요 기능:**
- 실시간 웹캠 프레임 캡처 (3초 간격)
- 감정 분석 API 호출 (10초 타임아웃)
- 설문 데이터와 웹캠 데이터 융합
- 에러 복구 (타임아웃 시 기본 벡터 사용)
- 비디오 상태 모니터링 및 자동 복구

**기술적 특징:**
- `useRef`를 사용한 상태 관리 (비동기 안정성)
- 타임아웃 보호 (15초)
- Network Error 즉시 처리
- 비디오 재생 상태 모니터링 (1초 간격)

### 2. 감정 분석 대기열 (VisualizationPage)

**기능:**
- `isViewed: false`인 설문만 표시
- 이름 마스킹 (개인정보 보호)
- Optimistic Update (즉시 UI 반영)
- `isActiveQueue` 활성화 (나의 감정 보기)
- 리다이렉트 메시지 및 카운트다운 (5초)

**플로우:**
```
시각화 시작 → 대기열 조회 → 설문 선택 
→ 나의 감정 보기 → isActiveQueue 활성화 
→ isViewed 업데이트 → 리다이렉트 메시지 → 메인 페이지 이동
```

### 3. 관리자 대시보드 (AdminPage)

**기능:**
- 설문 목록 조회 (페이지네이션)
- 설문 상세 조회
- `isViewed` 상태 표시 (감상여부 뱃지)
- 설문 삭제
- 통계 페이지 이동

**UI 특징:**
- 제출 날짜/시간 표시
- 감상여부 뱃지 (초록/빨강)
- 반응형 그리드 레이아웃

### 4. 통계 시각화 (StatsPage)

**차트 종류:**
- **히트맵**: 날짜/시간대별 제출 패턴 (D3.js)
- **라인차트**: 일별/시간별 추이
- **바차트**: 연령대별 분포
- **파이차트**: 8개 질문별 응답 분포

**반응형 특징:**
- 동적 aspectRatio 조정
- 모바일 최적화 (폰트 크기, 레이블 회전)
- ChartWrapper로 overflow 제어
- 전체 너비 활용

---

## 🌐 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (기본)
- 🇺🇸 영어

### 사용법
```jsx
import { useLanguage } from '../hooks/useLanguage';

function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### 번역 파일 위치
```
public/locales/
├── ko/translation.json  # 한국어 번역
└── en/translation.json  # 영어 번역
```

### 설문 스키마
```
src/data/
├── survey.ko.json  # 한국어 설문 질문
└── survey.en.json  # 영어 설문 질문
```

---

## 🔄 상태 관리

### React Query 사용

**설문 목록 조회:**
```jsx
import { useQuery } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';

const { data, isLoading } = useQuery({
  queryKey: ['surveys', currentPage],
  queryFn: () => surveyAPI.getSurveys(currentPage),
  keepPreviousData: true,
});
```

**설문 생성 (Mutation):**
```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const createMutation = useMutation({
  mutationFn: surveyAPI.createSurvey,
  onSuccess: () => {
    toast.success('설문이 제출되었습니다!');
    queryClient.invalidateQueries({ queryKey: ['surveys'] });
  },
});
```

**Optimistic Update:**
```jsx
const updateMutation = useMutation({
  mutationFn: (id) => surveyAPI.updateIsViewed(id, true),
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['surveys'] });
    const previousData = queryClient.getQueryData(['surveys']);
    
    queryClient.setQueryData(['surveys'], (old) => {
      // 즉시 UI 업데이트
      return updateData(old, id);
    });
    
    return { previousData };
  },
  onError: (error, id, context) => {
    // 실패 시 롤백
    queryClient.setQueryData(['surveys'], context.previousData);
  },
  onSettled: () => {
    // 최종 동기화
    queryClient.invalidateQueries({ queryKey: ['surveys'] });
  }
});
```

### React Hook Form 사용

```jsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
  defaultValues: { date: today, age: 25, userId: '' }
});

const onSubmit = async (data) => {
  // 데이터 검증 및 변환
  const processedData = {
    ...data,
    userId: Math.max(0, Math.min(9999, parseInt(data.userId) || 0)),
    age: Math.max(1, Math.min(100, parseInt(data.age) || 25)),
  };
  
  await surveyAPI.createSurvey(processedData);
};
```

---

## 🎨 스타일링

### Emotion CSS-in-JS

```jsx
import styled from '@emotion/styled';

const Button = styled.button`
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
```

### 색상 팔레트
- **Primary**: `#b84182ff` (핑크)
- **Secondary**: `#ddc9bfff` (베이지)
- **Accent**: `#F8EBE4` (연한 핑크)
- **Success**: `#28a745` (초록)
- **Danger**: `#dc3545` (빨강)

### 반응형 디자인
```jsx
const Container = styled.div`
  max-width: 1200px;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    max-width: 95%;
    padding: 1.5rem;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;
```

---

## 📡 API 통신

### API 클라이언트 구조

```javascript
// src/services/api.jsx
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### Survey API

```javascript
export const surveyAPI = {
  // 설문 생성
  createSurvey: async (payload) => {
    const response = await api.post('/api/surveys', payload);
    return response.data;
  },
  
  // 설문 목록 조회 (페이지네이션)
  getSurveys: async (page = 1) => {
    const response = await api.get('/api/surveys', { params: { page } });
    return response.data;
  },
  
  // 설문 수정
  updateSurvey: async (id, payload) => {
    const response = await api.put(`/api/surveys/${id}`, payload);
    return response.data;
  },
  
  // 설문 삭제
  deleteSurvey: async (id) => {
    const response = await api.delete(`/api/surveys/${id}`);
    return response.status;
  },
  
  // 감상여부 업데이트
  updateIsViewed: async (id, isViewed = true) => {
    const response = await api.patch(`/api/surveys/${id}/viewed`, { isViewed });
    return response.data;
  },
  
  // 활성 큐 업데이트
  updateIsActiveQueue: async (id, isActiveQueue = true) => {
    const response = await api.patch(`/api/surveys/${id}/active-queue`, { isActiveQueue });
    return response.data;
  },
  
  // 통계 조회
  getSurveyStats: async () => {
    const response = await api.get('/api/surveys/stats');
    return response.data;
  },
};
```

### Emotion API

```javascript
export const emotionAPI = {
  // 세션 시작
  startSession: async () => {
    const response = await api.post('/api/emotion/start-session');
    return response.data;
  },

  // 웹캠 감정 벡터 전송
  pushWebcamVector: async (sessionId, webcamVector) => {
    const response = await api.post('/api/emotion/push-webcam', {
      sessionId,
      webcamVector
    });
    return response.data;
  },

  // 설문 데이터와 웹캠 데이터 융합
  fuseEmotionData: async (sessionId, surveyData) => {
    const response = await api.post('/api/emotion/fuse', {
      sessionId,
      surveyData
    });
    return response.data;
  },

  // 이미지 감정 분석
  analyzeEmotionImage: async (imageFile) => {
    const form = new FormData();
    form.append('image', imageFile);
    
    const response = await api.post('/api/emotion/analyze', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 10000
    });
    return response.data;
  },
};
```

---

## 🚀 배포

### 환경별 빌드

```bash
# 개발 모드 (.env.development 사용)
npm run dev

# 프로덕션 빌드 (.env.production 사용)
npm run build
```

### AWS S3 + CloudFront

```bash
# 빌드
npm run build

# S3 업로드
aws s3 sync dist/ s3://your-bucket-name --delete

# CloudFront 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id YOUR_ID \
  --paths "/*"
```

### Netlify (권장)

1. GitHub 저장소 연결
2. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. 환경 변수 설정 (대시보드):
   - `VITE_API_BASE_URL` = `https://your-backend-url.com`

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 🐛 문제 해결

### CORS 에러

**증상:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**해결:**

1. **개발 환경**: Vite 프록시 사용 (이미 설정됨)
   ```javascript
   // vite.config.js
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'https://d114h2t0c1xjpp.cloudfront.net',
           changeOrigin: true,
           secure: false,
         }
       }
     }
   });
   ```

2. **프로덕션**: 백엔드 CORS 설정 필요
   - 백엔드 README 참고

### 환경 변수 인식 안됨

**해결:**
```bash
# 개발 서버 재시작
npm run dev
```

환경 변수 변경 시 **반드시 재시작** 필요!

### 웹캠 접근 권한 오류

**증상:**
```
NotAllowedError: Permission denied
```

**해결:**
- 브라우저 설정에서 웹캠 권한 허용
- HTTPS 환경에서 실행 (프로덕션)
- `localhost`에서는 HTTP도 허용됨 (개발)

### TypeError: Cannot read properties of undefined

**원인:** 백엔드 API 응답 구조가 예상과 다름

**해결:** 
- 브라우저 F12 → Network 탭에서 응답 확인
- 백엔드 README의 응답 형식 확인
- API 클라이언트의 응답 인터셉터 로그 확인

### 차트가 화면을 벗어남

**해결:**
- `ChartWrapper`의 `overflow: hidden` 확인
- `aspectRatio` 동적 조정 확인
- 반응형 브레이크포인트 확인

---

## 📝 개발 가이드

### 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용
- Hooks 활용 (useState, useEffect, useRef 등)
- PropTypes 또는 TypeScript 권장
- Emotion styled components 사용

### 파일 명명 규칙
- 컴포넌트: `PascalCase.jsx`
- 유틸리티: `camelCase.js`
- 상수: `UPPER_SNAKE_CASE`
- 훅: `useCamelCase.js`

### 코드 스타일
```bash
npm run lint          # ESLint 검사
npm run lint -- --fix # 자동 수정
```

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 등
```

---

## 🔗 관련 문서

- **백엔드 README** - 백엔드 API 명세 및 설정
- **AWS 배포 가이드** - 백엔드 배포 가이드 참고

---

## 📞 문의

프로젝트 관련 문의사항은 이슈를 등록해주세요.

---

**작성일:** 2025-01-15  
**버전:** 1.0.0  
**라이선스:** MIT
