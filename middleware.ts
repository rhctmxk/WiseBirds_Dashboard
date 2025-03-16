import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 🚨 어드민만 접근 가능하도록 허용
export function middleware(req: NextRequest) {
    const role = req.cookies.get('role')?.value || 'admin'; // 기본값 admin

    if (req.nextUrl.pathname.startsWith('/user') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url)); // 🚀 홈으로 리다이렉트
    }

    return NextResponse.next(); // ✅ 정상 접근 허용
}

// 적용할 경로 지정
export const config = {
    matcher: ['/user'], // '/user' 경로에서만 실행
}