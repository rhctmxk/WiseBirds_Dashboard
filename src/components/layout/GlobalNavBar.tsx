'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser } from "react-icons/fa";
import RoleSelect from '@/components/layout/RoleSelect';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/context/RoleContext';

export default function GlobalNavBar() {
    const pathname = usePathname();
    const { setRole } = useRole();
    const [role, setClientRole] = useState<string | null>(null);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const profileRef = useRef<HTMLLIElement>(null);

    // ✅ 기본 로고 설정: 현재 경로가 `/`이면 hover 이미지가 기본값
    const [logoSrc, setLogoSrc] = useState(
        pathname === '/' ? '/images/wisebirds_logo_hover.png' : '/images/wisebirds_logo-white.png'
    );

    // ✅ 유저 정보 가져오기
    const { user, loading } = useAuth();

    // ✅ 클라이언트에서 role 가져오기
    useEffect(() => {
        const storedRole = localStorage.getItem('role') || 'admin';
        setRole(storedRole);
        setClientRole(storedRole);
    }, [setRole]);

    if (loading || role === null) return null; // ✅ Hydration 방지

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg h-16">
            <div className="flex items-center justify-between px-6 h-full">
                <div className="flex flex-row items-center space-x-10">
                    <Link
                        href="/"
                        className="flex items-center h-full"
                        onMouseEnter={() => setLogoSrc('/images/wisebirds_logo_hover.png')}
                        onMouseLeave={() => setLogoSrc(pathname === '/' ? '/images/wisebirds_logo_hover.png' : '/images/wisebirds_logo-white.png')}
                    >
                        <Image
                            src={logoSrc}
                            alt="Wisebirds Logo"
                            width={120} // ✅ 로고 크기 키움
                            height={45}
                            className="object-contain h-14 transition-all duration-300"
                            priority
                        />
                    </Link>
                    <Link
                        href="/campaign"
                        className={`hover:underline ${pathname === '/campaign' ? 'text-point' : ''}`}
                    >
                        캠페인
                    </Link>
                    {role === 'admin' && (
                        <Link
                            href="/user"
                            className={`hover:underline ${pathname === '/user' ? 'text-point' : ''}`}
                        >
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
                            <span>{user?.email || '로그인 중...'}</span>
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
    );
}
