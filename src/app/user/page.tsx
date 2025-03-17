'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserTable from '@/components/user/UserTable';
import { useRole } from '@/context/RoleContext';
import { showAlert } from '@/components/common/AlertModal';


export default function UserPage() {
    const router = useRouter();
    const { role } = useRole(); // ✅ 전역 역할 상태 가져오기

    useEffect(() => {
        if (role && role !== 'admin') {
            showAlert({
                title: '접근 권한 없음',
                text: '사용자 관리 페이지는 관리자만 접근할 수 있습니다.',
                icon: 'error',
                confirmButtonText: '메인 페이지로 이동',
                onConfirm: () => router.replace('/'), // ✅ 확인 클릭 시 이동
            });
        }
    }, [role, router]);

// ✅ 역할 값이 결정될 때까지 Skeleton UI 유지
    if (!role || role !== 'admin') {
        return (
            <div className="container mx-auto p-6 min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-full max-w-3xl">
                    <div className="h-10 w-2/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">사용자 관리</h1>
            <UserTable />
        </div>
    );
}