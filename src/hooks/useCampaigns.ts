'use client';

import { useState, useEffect } from 'react';
import { fetchCampaigns } from '@/lib/api';
import { CampaignResponse } from '@/types/campaign';

export function useCampaigns(page: number = 0, size: number = 25) {
    const [data, setData] = useState<CampaignResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCampaigns() {
            setLoading(true);
            setError(null);

            const campaigns = await fetchCampaigns(page, size);
            if (campaigns) {
                setData(campaigns);
            } else {
                setError('캠페인 데이터를 불러오는데 실패했습니다.');
            }
            setLoading(false);
        }

        loadCampaigns();
    }, [page, size]);

    return { data, loading, error };
}
