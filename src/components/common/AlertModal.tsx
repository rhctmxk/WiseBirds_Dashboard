'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// ✅ SweetAlert2 인스턴스 생성
const MySwal = withReactContent(Swal);

interface AlertModalProps {
    title: string;
    text: string;
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText?: string;
    onConfirm?: () => void;
}

// ✅ Alert 모달 실행 함수
export function showAlert({
                              title,
                              text,
                              icon = 'warning',
                              confirmButtonText = '확인',
                              onConfirm,
                          }: AlertModalProps) {
    MySwal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm();
        }
    });
}
