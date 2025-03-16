'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import UserTable from '@/components/user/UserTable';

export default function UserPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role') || 'admin';
        setRole(storedRole);

        // 🚨 role이 'admin'이 아니면 즉시 리다이렉트 (페이지 렌더링 차단)
        if (storedRole !== 'admin') {
            router.replace('/');
        }
    }, [router]);

    // 🚨 role 값이 확인될 때까지 아무것도 렌더링하지 않음
    if (role === null || role !== 'admin') return null;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">사용자 관리</h1>
            <UserTable />
        </div>
    );
}
