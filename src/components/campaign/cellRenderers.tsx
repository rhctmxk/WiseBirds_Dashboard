import { MRT_Cell } from 'material-react-table';
import { Switch } from '@mui/material';
import { Campaign } from '@/types/campaign';

// ✅ 텍스트 (왼쪽 정렬)
export const renderTextCell = ({ cell }: { cell: MRT_Cell<Campaign, string> }) => (
    <div className="text-left">{cell.getValue()}</div>
);

// ✅ 숫자 (오른쪽 정렬)
export const renderNumberCell = ({ cell }: { cell: MRT_Cell<Campaign, number> }) => (
    <div className="text-right">{cell.getValue().toLocaleString()}</div>
);

// ✅ 토글 스위치 (가운데 정렬) - Viewer 제한 적용
export const renderToggleCell = ({ cell }: { cell: MRT_Cell<Campaign, boolean> }) => {
    const isEnabled = cell.getValue();
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : 'viewer'; // ✅ 서버 환경 방지

    const isEditable = role === 'admin' || role === 'manager'; // ✅ admin 또는 manager만 수정 가능

    return (
        <div className="text-center">
            <Switch
                checked={isEnabled}
                color="success"
                disabled={!isEditable} // ✅ viewer일 경우 비활성화
                onChange={(event) => {
                    if (!isEditable) return; // ✅ viewer는 변경 불가
                    const newStatus = event.target.checked;
                    console.log(`캠페인 ID: ${cell.row.original.id}, 새로운 상태: ${newStatus}`);
                    // TODO: API 연동하여 상태 업데이트
                }}
            />
        </div>
    );
};
