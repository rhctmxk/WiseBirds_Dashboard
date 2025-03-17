// src/app/not-found.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFoundPage() {
    const router = useRouter();

    useEffect(() => {
        console.error('🚨 404: 페이지를 찾을 수 없습니다.');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">페이지를 찾을 수 없습니다.</h2>
            <p className="text-gray-600 mb-6">존재하지 않는 페이지이거나, 잘못된 경로를 입력하셨습니다.</p>
            <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                홈으로 돌아가기
            </Link>
        </div>
    );
}
