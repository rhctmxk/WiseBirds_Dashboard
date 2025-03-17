'use client';

import { useState } from 'react';
import { MRT_Cell } from 'material-react-table';
import { Switch } from '@mui/material';
import { Campaign } from '@/types/campaign';
import { useRole } from '@/context/RoleContext';
import { updateCampaignStatus } from '@/lib/api';
import { useError } from '@/context/ErrorContext';

// ✅ 텍스트 (왼쪽 정렬)
export const renderTextCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => (
    <div className="text-left">{cell.getValue<string>()}</div>
);

// ✅ 숫자 (오른쪽 정렬)
export const renderNumberCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => (
    <div className="text-right">{cell.getValue<number>().toLocaleString()}</div>
);

// ✅ 숫자 (헤더 오른쪽 정렬)
export const applyRightAlignStyles = () => ({
    muiTableHeadCellProps: {
        sx: {
            '& .Mui-TableHeadCell-Content': {
                justifyContent: "flex-end !important",
                textAlign: "right !important",
            }
        }
    },
    muiTableBodyCellProps: {
        sx: {
            textAlign: "right",
        }
    }
});
// ✅ 숫자 (헤더 오른쪽 정렬)
export const applyCenterAlignStyles = () => ({
    muiTableHeadCellProps: {
        sx: {
            '& .Mui-TableHeadCell-Content': {
                justifyContent: "center !important",
                textAlign: "center !important",
            }
        }
    },
    muiTableBodyCellProps: {
        sx: {
            textAlign: "center",
        }
    }
});


// ✅ 캠페인 목적 내용 전환
const campaignObjectiveMap: Record<string, string> = {
    WEBSITE_CONVERSIONS: "웹사이트 전환",
    WEBSITE_TRAFFIC: "웹사이트 트래픽",
    SALES: "판매",
    APP_INSTALLATION: "앱설치",
    LEAD: "리드",
    BRAND: "브랜드 인지도 및 도달 범위",
    VIDEO_VIEWS: "동영상 조회",
};
export const renderCampaignObjectiveCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => {
    const value = cell.getValue<string>(); // 원본 값
    const displayValue = campaignObjectiveMap[value] || value; // 변환된 값 (없으면 원본 값 그대로)

    return <div className="text-left">{displayValue}</div>;
};

// ✅ 소수 셋째 자리 반올림 후, 둘째 자리까지 표시
export const renderFloatCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => {
    const value = cell.getValue<number>() * 100;
    const roundedValue = Math.round(value * 100) / 100;

    return (
        <div className="text-right">
            {roundedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
        </div>
    );
};


// ✅ 토글 스위치 (에러 발생 시 모달 표시)
export function renderToggleCell({ cell }: { cell: MRT_Cell<Campaign> }) {
    const initialEnabled = cell.getValue<boolean>();
    const [isEnabled, setIsEnabled] = useState(initialEnabled);
    const { role } = useRole();
    const { setError } = useError();  // ✅ React 컴포넌트 안에서 호출 가능

    if (!role) return null;
    const isEditable = role === 'admin' || role === 'manager';

    const handleToggleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isEditable) return;
        const newStatus = event.target.checked;

        setIsEnabled(newStatus); // ✅ UI 즉시 변경

        try {
            const success = await updateCampaignStatus(cell.row.original.id, newStatus);
            if (!success) {
                throw new Error('캠페인 상태 업데이트 실패');
            }
        } catch (error: unknown) {
            setIsEnabled(initialEnabled); // ✅ API 실패 시 기존 값으로 복구

            if (error instanceof Error) {
                setError(error.message); // ✅ 전역 에러 컨텍스트 업데이트
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="text-center">
            <Switch
                checked={isEnabled}
                color="success"
                disabled={!isEditable}
                onChange={handleToggleChange}
            />
        </div>
    );
}


interface ToggleCellProps {
    cell: MRT_Cell<Campaign>;
}

export function ToggleCell({ cell }: ToggleCellProps) {
    const initialEnabled = cell.getValue<boolean>();
    const [isEnabled, setIsEnabled] = useState(initialEnabled);
    const { role } = useRole();
    const { setError } = useError();

    if (!role) return null;
    const isEditable = role === 'admin' || role === 'manager';

    const handleToggleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isEditable) return;
        const newStatus = event.target.checked;

        setIsEnabled(newStatus); // ✅ UI 즉시 변경

        try {
            const success = await updateCampaignStatus(cell.row.original.id, newStatus);
            if (!success) {
                throw new Error('캠페인 상태 업데이트 실패');
            }
        } catch (error: unknown) {
            setIsEnabled(initialEnabled); // ✅ API 실패 시 기존 값으로 복구

            if (error instanceof Error) {
                setError(error.message); // ✅ 전역 에러 컨텍스트 업데이트
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="text-center">
            <Switch
                checked={isEnabled}
                color="success"
                disabled={!isEditable}
                onChange={handleToggleChange}
            />
        </div>
    );
}