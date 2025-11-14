# 색인(SaekIn) 프론트엔드

React와 Vite를 기반으로 한 **감정 분석 및 시각화 웹 애플리케이션**의 프론트엔드입니다.

## ✨ 주요 기능

- 📋 **웹캠 기반 감정 설문조사**: 8개 심리 평가 질문 + 실시간 웹캠 감정 분석
- 📊 **통계 시각화**: Chart.js와 D3.js를 활용한 다양한 차트
- 🗂️ **관리자 대시보드**: 설문 데이터 CRUD 및 페이지네이션
- 🌐 **다국어 지원**: 한국어/영어 (react-i18next)
- 📱 **반응형 디자인**: 모바일과 데스크톱 최적화
- 🎨 **감정 기반 UI**: Emotion CSS-in-JS 스타일링

---

## 🛠️ 기술 스택

### 핵심
- **React 19.1.1** + **Vite 7.1.2** (SWC)
- **React Router v7** - 클라이언트 사이드 라우팅
- **TanStack Query v5** - 서버 상태 관리
- **React Hook Form v7** - 폼 관리
- **Axios** - HTTP 클라이언트

### 스타일링
- **Emotion** - CSS-in-JS
- **React Icons** - 아이콘

### 시각화
- **Chart.js v4** + **react-chartjs-2** - 바/라인/파이 차트
- **D3.js v7** - 커스텀 히트맵

### 국제화 & UX
- **react-i18next** - 다국어
- **react-toastify** - 알림

---

## 🚀 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone <repository-url>
cd FrontEnd

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

프로젝트는 **환경별 자동 설정**을 사용합니다:

```
.env.development    # 개발 환경 (자동 사용)
.env.production     # 프로덕션 환경 (자동 사용)
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

> **참고:** `.env` 파일은 필요 없습니다. Vite가 자동으로 환경에 맞는 파일을 선택합니다.

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
│   ├── common/         # 공통 컴포넌트 (Layout, Button 등)
│   ├── Header.jsx      # 헤더 (네비게이션, 언어 전환)
│   ├── Footer.jsx      # 푸터
│   ├── SurveyForm.jsx  # 설문 폼 (감정 데이터 포함)
│   └── HeatmapChart.jsx # D3.js 히트맵
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.jsx    # 메인 페이지
│   ├── AnalyzePage.jsx # 감정 설문조사 (웹캠 분석)
│   ├── VisualizationPage.jsx # 감정 분석 대기열
│   ├── AdminPage.jsx   # 관리자 페이지
│   └── StatsPage.jsx   # 통계 대시보드
├── services/
│   └── api.jsx         # API 클라이언트 (surveyAPI, emotionAPI)
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티
├── constants/          # 상수
├── styles/             # 글로벌 스타일
└── data/               # 정적 데이터 (설문 스키마)
```

---

## 🎯 핵심 기능 설명

### 1. 웹캠 기반 감정 분석 (AnalyzePage)

**플로우:**
```
설문 시작 → 웹캠 활성화 → 3초마다 프레임 캡처 
→ 감정 분석 API 호출 → 벡터 전송 → 설문 완료 
→ 데이터 융합 → 최종 저장
```

**주요 기능:**
- 실시간 웹캠 프레임 캡처 (3초 간격)
- 감정 분석 API 호출 (10초 타임아웃)
- 설문 데이터와 웹캠 데이터 융합
- 에러 복구 (타임아웃 시 기본 벡터 사용)

### 2. 감정 분석 대기열 (VisualizationPage)

- `isViewed: false`인 설문만 표시
- 이름 마스킹 (개인정보 보호)
- Optimistic Update (즉시 UI 반영)

### 3. 관리자 대시보드 (AdminPage)

- 설문 목록 조회 (페이지네이션)
- 설문 상세 조회
- `isViewed` 상태 토글
- 설문 삭제

### 4. 통계 시각화 (StatsPage)

- **히트맵**: 날짜/시간대별 제출 패턴 (D3.js)
- **라인차트**: 일별/시간별 추이
- **바차트**: 연령대별 분포
- **파이차트**: 8개 질문별 응답 분포

---

## 🌐 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (기본)
- 🇺🇸 영어

### 사용법
```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### 번역 파일 위치
```
public/locales/
├── ko/translation.json
└── en/translation.json
```

---

## 🔄 상태 관리

### React Query 사용

```jsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';

// 설문 목록 조회
const { data, isLoading } = useQuery({
  queryKey: ['surveys', currentPage],
  queryFn: () => surveyAPI.getSurveys(currentPage),
});

// 설문 생성
const createMutation = useMutation({
  mutationFn: surveyAPI.createSurvey,
  onSuccess: () => {
    toast.success('설문이 제출되었습니다!');
  },
});
```

### React Hook Form 사용

```jsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

<FormField
  name="question1"
  type="radio"
  register={register}
  errors={errors}
  options={[...]}
/>
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
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

### 색상 팔레트
- **Primary**: `#b84182ff` (핑크)
- **Secondary**: `#ddc9bfff` (베이지)
- **Accent**: `#F8EBE4` (연한 핑크)

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
   server: {
     proxy: {
       '/api': {
         target: 'https://d114h2t0c1xjpp.cloudfront.net',
         changeOrigin: true
       }
     }
   }
   ```

2. **프로덕션**: 백엔드 CORS 설정 필요
   - `BACKEND_REQUIREMENTS.md` 참고

### 환경 변수 인식 안됨

**해결:**
```bash
# 개발 서버 재시작
npm run dev
```

환경 변수 변경 시 **반드시 재시작** 필요!

### TypeError: Cannot read properties of undefined

**원인:** 백엔드 API 응답 구조가 예상과 다름

**해결:** 
- 브라우저 F12 → Network 탭에서 응답 확인
- `BACKEND_REQUIREMENTS.md`의 응답 형식 확인

---

## 📝 개발 가이드

### 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용
- Hooks 활용
- PropTypes 또는 TypeScript 권장

### 파일 명명 규칙
- 컴포넌트: `PascalCase.jsx`
- 유틸리티: `camelCase.js`
- 상수: `UPPER_SNAKE_CASE`

### 코드 스타일
```bash
npm run lint          # ESLint 검사
npm run lint -- --fix # 자동 수정
```

---

## 🔗 관련 문서

- **BACKEND_REQUIREMENTS.md** - 백엔드 API 요구사항 명세
- **.env.example** - 환경 변수 예시

---

## 📞 문의

프로젝트 관련 문의사항은 이슈를 등록해주세요.

---

**작성일:** 2025-01-15  
**버전:** 1.0.0  
**라이선스:** MIT
