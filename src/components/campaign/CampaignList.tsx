'use client';

import { useCampaigns } from '@/hooks/useCampaigns';
import { campaignColumns } from './campaignColumns';
import { MaterialReactTable } from 'material-react-table';
import { Campaign } from '@/types/campaign';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

export default function CampaignList() {
    const { data, loading, error } = useCampaigns(0, 25); // 🚀 25개씩 가져오기
    console.log('campaign data', data)

    if (loading) {
        return (
            <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                {/* ✅ 더 나은 로딩 UI 적용 */}
                <div className="w-full max-w-3xl">
                    <div className="h-10 w-2/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                    <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error || !data || data.empty) {
        return <EmptyState message="캠페인 데이터가 없습니다." />;
    }

    return (
        <div className="p-3">
            <MaterialReactTable<Campaign>
                columns={campaignColumns} // ✅ 분리된 컬럼 사용
                data={data.content} // ✅ 테이블 데이터 연결
                paginationDisplayMode="pages" // ✅ 페이지네이션 적용
                localization={{
                    rowsPerPage: '페이지당 캠페인 수',
                }}
                initialState={{
                    pagination: { pageSize: 25, pageIndex: 0 }, // ✅ 25개씩 표시
                    density: 'compact'
                }}
            />
        </div>
    );
}