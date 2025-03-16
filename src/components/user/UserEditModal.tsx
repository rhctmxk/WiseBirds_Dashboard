'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { User } from '@/types/user';
import axios, { AxiosError } from 'axios';

interface UserEditModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (updatedUser: User) => void;
}

export default function UserEditModal({ open, onClose, user, onSave }: UserEditModalProps) {
    const router = useRouter(); // ✅ 최신 데이터 반영을 위해 Next.js Router 사용

    const [name, setName] = useState(user?.name || '');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) setName(user.name);
    }, [user]);

    // ✅ 이름 검증 함수
    const validateName = (value: string): string | null => {
        if (!value) return '이름을 입력하세요';
        if (!/^[a-zA-Z가-힣]{1,16}$/.test(value)) return '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가)';
        return null;
    };

    // ✅ 저장 버튼 클릭 핸들러
    const handleSave = async () => {
        if (!user) return;
        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.patch(`/api/users/${user.id}`, { name });

            if (response.data.result) {
                onSave({ ...user, name }); // ✅ 부모 컴포넌트에 업데이트된 데이터 전달
                onClose(); // ✅ 모달 닫기
                router.refresh(); // ✅ 페이지 새로고침하여 최신 데이터 반영
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                setError(axiosError.response?.data?.message || '사용자 정보를 업데이트할 수 없습니다.');
            } else {
                console.error('❌ 알 수 없는 오류:', error);
                setError('예기치 않은 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>사용자 수정</DialogTitle>
            <DialogContent>
                <div className="p-4 flex flex-col gap-4">
                    <TextField label="아이디" value={user?.email || ''} fullWidth disabled />
                    <TextField
                        label="이름"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(null);
                        }}
                        fullWidth
                        error={!!error}
                        helperText={error || ''}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>취소</Button>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
                    {loading ? '저장 중...' : '저장'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
