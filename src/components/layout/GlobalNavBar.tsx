'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaRegUser } from "react-icons/fa"
import RoleSelect from '@/components/layout/RoleSelect';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/context/RoleContext';

export default function GlobalNavBar() {
    const pathname = usePathname();
    const { role, setRole } = useRole(); // ✅ Context에서 role 가져오기
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const profileRef = useRef<HTMLLIElement>(null);

    // 유저 정보 가져오기
    const { user, loading } = useAuth();

    if (loading) return null; // ✅ 로딩 중이면 렌더링 안함

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
    );
}