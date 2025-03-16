export interface Campaign {
    id: number;
    name: string;
    enabled: boolean;
    campaign_objective: string;
    impressions: number;
    clicks: number;
    ctr: number;
    video_views: number;
    vtr: number;
}

export interface CampaignResponse {
    content: Campaign[];
    size: number;
    total_elements: number;
    total_pages: number;
    last: boolean;
    number: number;
    first: boolean;
    empty: boolean;
}
