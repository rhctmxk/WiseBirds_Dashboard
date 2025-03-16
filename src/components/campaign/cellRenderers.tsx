// 📁 components/table/cellRenderers.tsx
import { MRT_Cell } from 'material-react-table';
import { Switch } from '@mui/material';
import { Campaign } from '@/types/campaign';
import { useRole } from '@/context/RoleContext';

// ✅ 텍스트 (왼쪽 정렬)
export const renderTextCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => (
    <div className="text-left">{cell.getValue<string>()}</div>
);

// ✅ 숫자 (오른쪽 정렬)
export const renderNumberCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => (
    <div className="text-right">{cell.getValue<number>().toLocaleString()}</div>
);

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

// ✅ 토글 스위치 (가운데 정렬) - Viewer 제한 적용
export const renderToggleCell = ({ cell }: { cell: MRT_Cell<Campaign> }) => {
    const isEnabled = cell.getValue<boolean>();
    const { role } = useRole(); // ✅ Context에서 role 가져오기

    if (!role) return null;

    const isEditable = role === 'admin' || role === 'manager';

    return (
        <div className="text-center">
            <Switch
                checked={isEnabled}
                color="success"
                disabled={!isEditable}
                onChange={(event) => {
                    if (!isEditable) return;
                    const newStatus = event.target.checked;
                    console.log(`캠페인 ID: ${cell.row.original.id}, 새로운 상태: ${newStatus}`);
                    // TODO: API 연동하여 상태 업데이트
                }}
            />
        </div>
    );
};
