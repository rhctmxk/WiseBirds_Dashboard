import { MRT_ColumnDef } from 'material-react-table';
import { Campaign } from '@/types/campaign';
import {
    renderTextCell,
    renderNumberCell,
    renderCampaignObjectiveCell,
    renderFloatCell,
    ToggleCell,
    applyRightAlignStyles, applyCenterAlignStyles
} from './cellRenderers';

export const campaignColumns: MRT_ColumnDef<Campaign>[] = [
    {
        accessorKey: 'enabled',
        header: '상태',
        size: 100,
        Cell: ({ cell }) => <ToggleCell cell={cell} />, // ✅ 함수가 아닌 컴포넌트로 변경
        ...applyCenterAlignStyles()
    },
    {
        accessorKey: 'name',
        header: '캠페인명',
        size: 150,
        Cell: renderTextCell,
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
    },
    {
        accessorKey: 'campaign_objective',
        header: '캠페인 목적',
        size: 200,
        Cell: renderCampaignObjectiveCell, // ✅ 변환된 값을 표시하도록 변경
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
    },
    {
        accessorKey: 'impressions',
        header: '노출수',
        size: 120,
        Cell: renderNumberCell,
        ...applyRightAlignStyles()
    },
    {
        accessorKey: 'clicks',
        header: '클릭수',
        size: 120,
        Cell: renderNumberCell,
        ...applyRightAlignStyles()
    },
    {
        accessorKey: 'ctr',
        header: 'CTR (%)',
        size: 120,
        Cell: renderFloatCell, // ✅ 소수 셋째 자리 반올림 후, 둘째 자리까지 표시
        ...applyRightAlignStyles()
    },
    {
        accessorKey: 'video_views',
        header: '비디오 조회수',
        size: 120,
        Cell: renderNumberCell,
        ...applyRightAlignStyles()
    },
    {
        accessorKey: 'vtr',
        header: 'VTR (%)',
        size: 120,
        Cell: renderFloatCell,
        ...applyRightAlignStyles()
    },
];
