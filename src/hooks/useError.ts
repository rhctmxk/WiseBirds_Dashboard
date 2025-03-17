'use client';

import { useState } from 'react';

// ✅ 커스텀 훅: API 에러 감지 및 모달 상태 관리
export function useError() {
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const showError = (message: string) => {
        setError(message);
        setOpen(true);
    };

    const closeError = () => {
        setOpen(false);
        setError(null);
    };

    return { error, open, showError, closeError };
}
