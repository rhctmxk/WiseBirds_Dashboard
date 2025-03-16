import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalNavBar from '@/components/layout/GlobalNavBar'


// Google Fonts 설정
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: '와이즈버즈 대시보드',
    description: 'A comprehensive campaign dashboard for WiseBirds marketing analytics.',
    keywords: ['WiseBirds', 'dashboard', 'campaign', 'marketing'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
        <body className="bg-gray-100 text-gray-900">
        <GlobalNavBar />
        <main className="pt-16">{children}</main>
        </body>
        </html>
    )
}