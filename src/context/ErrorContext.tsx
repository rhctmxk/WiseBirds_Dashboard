'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// ✅ 에러 컨텍스트 타입 정의
interface ErrorContextType {
    error: string | null;
    setError: (message: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

// ✅ 에러 프로바이더 생성
export function ErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
}

// ✅ 전역 에러 핸들링 훅
export function useError(): ErrorContextType {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
}
