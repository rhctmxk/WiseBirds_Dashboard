'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaRegUser } from "react-icons/fa"
import RoleSelect from '@/components/layout/RoleSelect';
import { useAuth } from '@/hooks/useAuth';

export default function GlobalNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null); // ✅ 초기값을 null로 설정
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const profileRef = useRef<HTMLLIElement>(null);

    // 유저 정보 가져오기
    const { user, loading } = useAuth();

    // 클라이언트에서 localStorage의 role 값을 가져오기 (서버에서는 실행되지 않음)
    useEffect(() => {
        const storedRole = localStorage.getItem('role') || 'admin'; // ✅ 기본값 'admin'
        localStorage.setItem('role', storedRole); // ✅ 없으면 'admin'으로 저장
        setRole(storedRole);
    }, []);

    useEffect(() => {
        if (pathname === '/user' && role && role !== 'admin') {
            router.replace('/');
        }
    }, [pathname, role, router]);

    // 초기 렌더링 중에는 UI를 숨김 (Hydration Mismatch 방지)
    if (role === null || loading) {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex flex-row items-center space-x-10">
                    <Link href="/" className="text-lg md:text-2xl font-bold hover:underline">
                        와이즈버즈
                    </Link>
                    <Link href="/campaign" className={`hover:underline ${pathname === '/campaign' ? 'text-point' : ''}`}>
                        캠페인
                    </Link>
                    {/* ✅ role이 설정된 이후에만 /user 링크를 보여줌 */}
                    {role === 'admin' && (
                        <Link href="/user" className={`hover:underline ${pathname === '/user' ? 'text-point' : ''}`}>
                            사용자
                        </Link>
                    )}
                </div>

                <ul className="flex space-x-8 items-center">
                    <li className="relative" ref={profileRef}>
                        <button
                            className="flex space-x-2 p-2 transition items-center hover:text-point"
                            onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}
                        >
                            <FaRegUser />
                            <span>jhlee@gmail.com</span>
                        </button>

                        {isProfilePopupOpen && user && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md p-4 flex flex-col space-y-2">
                                <span className="font-semibold text-gray-700">{user.name}</span>
                                <span className="text-gray-500">{user.email}</span>
                                <span className="text-gray-400 text-sm">{user.company.name}</span>
                            </div>
                        )}
                    </li>

                    <li className="relative">
                        <RoleSelect role={role} setRole={setRole} />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
