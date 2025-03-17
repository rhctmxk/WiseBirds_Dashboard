#  WiseBirds Dashboard

WiseBirds Dashboard는 캠페인 및 사용자 관리를 위한 대시보드 애플리케이션입니다.  
이 프로젝트는 **Next.js, TypeScript, Material UI, TailwindCSS**를 사용하여 개발되었습니다.

---

## 📂 프로젝트 구조
```
📦 wisebirds-dashboard
├── 📂 public
│   ├── 📂 images             # 이미지, 로고
├── 📂 src
│   ├── 📂 app                # Next.js App Router (페이지 라우팅)
│   ├── 📂 components         # 공통 UI 및 기능 컴포넌트
│   ├── 📂 context            # 전역 상태 관리 (Role, Error 등)
│   ├── 📂 hooks              # Custom Hooks (API, Auth 등)
│   ├── 📂 lib                # API 요청 및 유틸리티 함수
│   ├── 📂 pages              # 기본적인 페이지 구조
│   ├── 📂 types              # TypeScript 인터페이스 정의
│   ├── 📂 mocks              # Mock 데이터 (API 개발 전 테스트용)
├── 📄 next.config.js         # Next.js 설정 파일
├── 📄 package.json           # 프로젝트 의존성 및 스크립트
├── 📄 README.md              # 프로젝트 설명
```

---

## ⚙️ 설치 및 실행 방법

### 1️⃣ **레퍼지토리 클론**
```sh
git clone https://github.com/rhctmxk/WiseBirds_Dashboard.git
cd campaign-dashboard
```

### 2️⃣ **환경 변수 설정**
.env.local 파일을 생성하고 아래 내용을 추가합니다.
```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### 3️⃣ **패키지 설치**
```sh
npm install  # 또는 yarn install
```

### 4️⃣ **개발 서버 실행**
```sh
npm install  # 또는 yarn install
```

### 📡 **API Mock 데이터 사용**
```sh
const USE_MOCK = true;
```

---

## 📌 **기능 설명**
### ✅ **사용자 관리**

 - 관리자는 새로운 사용자를 생성 및 수정 가능
 - SweetAlert2 기반으로 역할 변경 시 알림 표시

### ✅ **캠페인 관리**
- 토글 스위치를 이용하여 캠페인 활성화/비활성화 가능
- admin, manager만 수정 가능 (viewer는 제한됨)
### ✅ **전역 상태 관리 관리**
- RoleContext.tsx : 사용자 역할 (admin, manager, viewer)
- ErrorContext.tsx : 전역 에러 핸들링 및 SweetAlert2 경고 표시


## 🎨 **UI 스타일**
- TailwindCSS 기반으로 스타일링
- 네비게이션 바에 WiseBirds 로고 추가 (마우스 오버 시 이미지 변경)
- Skeleton UI 적용 (데이터 로딩 중에도 깜빡임 방지)


## 🛠 **주요 라이브러리**
>next, react, typescript, tailwindcss, axios, material-react-table, sweetalert2

---

### 📝 **TODO**
 - 사용자 삭제 기능 추가
 - 캠페인 필터링 기능 개선
 - API 연동 시 Mock 데이터 제거

### 📌 **문의**
WiseBirds Dashboard 프로젝트에 대한 문의는 아래 이메일로 보내주세요.

📧 문의: annawlgus1004@gmail.com