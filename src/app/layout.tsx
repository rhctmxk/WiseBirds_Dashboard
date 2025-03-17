import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GlobalNavBar from '@/components/layout/GlobalNavBar';
import { RoleProvider } from '@/context/RoleContext';
import { ErrorProvider } from '@/context/ErrorContext';
import ErrorModal from '@/components/common/ErrorModal';

// Google Fonts 설정
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: '와이즈버즈 대시보드',
    description: 'A comprehensive campaign dashboard for WiseBirds marketing analytics.',
    keywords: ['WiseBirds', 'dashboard', 'campaign', 'marketing'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
        <body className="bg-gray-100 text-gray-900">
        {/* ✅ 최상위 Provider를 <body> 바로 아래로 이동 */}
        <ErrorProvider> {/* ✅ 전역 에러 상태 관리 */}
            <RoleProvider>
                <GlobalNavBar />
                <main className="pt-16">
                    {children}
                </main>
                <ErrorModal /> {/* ✅ 전역 에러 모달 표시 */}
            </RoleProvider>
        </ErrorProvider>
        </body>
        </html>
    );
}
