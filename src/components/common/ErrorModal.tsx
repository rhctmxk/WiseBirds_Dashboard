'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useError } from '@/context/ErrorContext';

export default function ErrorModal() {
    const { error, clearError } = useError();
    const [isClient, setIsClient] = useState(false);

    // ✅ Hydration 오류 방지: 클라이언트에서만 실행
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // ✅ 서버 렌더링 시 모달을 렌더링하지 않음

    return (
        <Dialog open={!!error} onClose={clearError} maxWidth="sm" fullWidth>
            <DialogTitle>에러가 발생했습니다.</DialogTitle>
            <DialogContent>
                <div className="py-2">
                    <p>{error}</p>
                    <p>같은 현상이 반복되면 아래 고객센터로 문의 바랍니다.</p>
                </div>

                <div className="py-2">
                    <p><strong>고객센터</strong></p>
                    <p>- email: annawlgus1004@gmail.com</p>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearError} color="primary">닫기</Button>
            </DialogActions>
        </Dialog>
    );
}
