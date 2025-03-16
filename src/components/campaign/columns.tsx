import { MRT_ColumnDef } from 'material-react-table';
import { Campaign } from '@/types/campaign';
import { renderTextCell, renderNumberCell, renderToggleCell } from './cellRenderers';

// ✅ 캠페인 테이블 컬럼 정의
export const campaignColumns: MRT_ColumnDef<Campaign>[] = [
    {
        accessorKey: 'enabled',
        header: '상태',
        size: 100,
        Cell: renderToggleCell,
        muiTableHeadCellProps: { sx: { textAlign: 'center' } },
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
        Cell: renderTextCell,
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
    },
    {
        accessorKey: 'impressions',
        header: '노출수',
        size: 120,
        Cell: renderNumberCell,
        muiTableHeadCellProps: { sx: { textAlign: 'right' } },
    },
    {
        accessorKey: 'clicks',
        header: '클릭수',
        size: 120,
        Cell: renderNumberCell,
        muiTableHeadCellProps: { sx: { textAlign: 'right' } },
    },
    {
        accessorKey: 'ctr',
        header: 'CTR (%)',
        size: 120,
        Cell: ({ cell }) => <div className="text-right">{(cell.getValue<number>() * 100).toFixed(2)}%</div>,
        muiTableHeadCellProps: { sx: { textAlign: 'right' } },
    },
    {
        accessorKey: 'video_views',
        header: '비디오 조회수',
        size: 120,
        Cell: renderNumberCell,
        muiTableHeadCellProps: { sx: { textAlign: 'right' } },
    },
    {
        accessorKey: 'vtr',
        header: 'VTR (%)',
        size: 120,
        Cell: ({ cell }) => <div className="text-right">{(cell.getValue<number>() * 100).toFixed(2)}%</div>,
        muiTableHeadCellProps: { sx: { textAlign: 'right' } },
    },
];
