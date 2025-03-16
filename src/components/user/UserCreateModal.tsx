'use client';

import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';

interface UserCreateModalProps {
    open: boolean;
    onClose: () => void;
    onUserCreated: () => void; // ✅ 사용자 생성 후 테이블 업데이트
}

// ✅ 사용자 생성 API 응답 타입
interface CreateUserResponse {
    result: boolean;
    id: number;
}

export default function UserCreateModal({ open, onClose, onUserCreated }: UserCreateModalProps) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null); // ✅ 이메일 중복 체크 결과
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; name?: string }>({});
    const [loading, setLoading] = useState(false);

    // ✅ 이메일 검증
    const validateEmail = (email: string): string | null => {
        if (!email) return '아이디(이메일)을 입력하세요.';
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email) || email.length < 9 || email.length > 50) {
            return '올바른 이메일 주소를 입력하세요.';
        }
        return null;
    };

    // ✅ 비밀번호 검증
    const validatePassword = (password: string): string | null => {
        if (!password) return '비밀번호를 입력하세요.';
        if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/.test(password)) {
            return '8~15자 영문, 숫자, 특수문자를 사용하세요.';
        }
        return null;
    };

    // ✅ 비밀번호 확인 검증
    const validateConfirmPassword = (): string | null => {
        if (!confirmPassword) return '비밀번호를 입력하세요.';
        if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.';
        return null;
    };

    // ✅ 이름 검증
    const validateName = (name: string): string | null => {
        if (!name) return '이름을 입력하세요.';
        if (!/^[a-zA-Z가-힣]{1,16}$/.test(name)) return '이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력불가)';
        return null;
    };

    // ✅ 이메일 중복 체크 API 호출 (Blur 이벤트에서 실행)
    const checkEmailExists = async () => {
        const emailError = validateEmail(email);
        if (emailError) {
            setErrors((prev) => ({ ...prev, email: emailError }));
            return;
        }

        try {
            const response = await axios.get<{ result: boolean }>(`/api/users/${email}/exists`);
            setIsEmailValid(!response.data.result);
            setErrors((prev) => ({
                ...prev,
                email: response.data.result ? '이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.' : '',
            }));
        } catch (error) {
            console.error('❌ 이메일 중복 확인 실패:', error);
            setErrors((prev) => ({ ...prev, email: '이메일 중복 확인 중 오류가 발생했습니다.' }));
        }
    };

    // ✅ 사용자 생성 API 요청
    const handleCreateUser = async () => {
        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(),
            name: validateName(name),
        };

        if (Object.values(newErrors).some((error) => error !== null)) {
            setErrors(newErrors);
            return;
        }

        if (isEmailValid === false) {
            setErrors((prev) => ({ ...prev, email: '이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.' }));
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post<CreateUserResponse>('/api/users', { email, password, name });

            if (response.data.result) {
                onUserCreated(); // ✅ 테이블 업데이트
                onClose(); // ✅ 모달 닫기
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                if (axiosError.response?.data?.message === 'EMAIL_DUPLICATE') {
                    setErrors((prev) => ({ ...prev, email: '이미 사용중인 이메일입니다. 다른 이메일을 입력하세요.' }));
                } else {
                    setErrors((prev) => ({ ...prev, email: '사용자를 생성할 수 없습니다.' }));
                }
            } else {
                console.error('❌ 알 수 없는 오류:', error);
                setErrors((prev) => ({ ...prev, email: '예기치 않은 오류가 발생했습니다.' }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>사용자 생성</DialogTitle>
            <DialogContent>
                <div className="p-4 flex flex-col gap-4">
                    <TextField
                        label="아이디 (이메일)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={checkEmailExists} // ✅ 입력 완료 후 포커스를 벗어나면 중복 체크 실행
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email || ''}
                    />
                    <TextField
                        label="비밀번호"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="영문, 숫자, 특수문자 조합 8~15자"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password || ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword || ''}
                    />
                    <TextField
                        label="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name || ''}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={loading}>취소</Button>
                <Button onClick={handleCreateUser} color="primary" variant="contained" disabled={loading}>
                    {loading ? '생성 중...' : '생성'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
