import axios from 'axios';
import { CampaignResponse } from "@/types/campaign";

// API 기본 URL 설정
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ 목업(Mock) 데이터 생성
const mockUser = {
    id: 1,
    email: "abc@abc.com",
    name: "홍길동",
    company: {
        id: 1,
        name: "와이즈버즈"
    }
};
export async function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockUser), 500); // 0.5초 딜레이 후 반환
    });
}

// 유저 정보 가져오기
// export async function fetchUser() {
//     try {
//         const response = await api.get('/api/auth/me');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         return null;
//     }
// }

const MockCampaign: CampaignResponse = {
    "content": [
        {
            "id": 1,
            "name": "캠페인1",
            "enabled": true,
            "campaign_objective": "WEBSITE_TRAFFIC",
            "impressions": 944577,
            "clicks": 8577,
            "ctr": 0.1937,
            "video_views": 2576,
            "vtr": 0.83025
        },
        {
            "id": 2,
            "name": "캠페인2",
            "enabled": false,
            "campaign_objective": "WEBSITE_CONVERSIONS",
            "impressions": 923577,
            "clicks": 710,
            "ctr": 0.4175,
            "video_views": 619,
            "vtr": 0.35538
        },
        {
            "id": 3,
            "name": "캠페인3",
            "enabled": true,
            "campaign_objective": "WEBSITE_TRAFFIC",
            "impressions": 588314,
            "clicks": 2373,
            "ctr": 0.6573,
            "video_views": 2209,
            "vtr": 0.8565
        },
        {
            "id": 4,
            "name": "캠페인4",
            "enabled": true,
            "campaign_objective": "APP_INSTALLATION",
            "impressions": 862347,
            "clicks": 3764,
            "ctr": 0.5232,
            "video_views": 4857,
            "vtr": 0.96033
        },
        {
            "id": 5,
            "name": "캠페인5",
            "enabled": false,
            "campaign_objective": "WEBSITE_CONVERSIONS",
            "impressions": 934303,
            "clicks": 7722,
            "ctr": 0.8496,
            "video_views": 1289,
            "vtr": 0.369
        },
        {
            "id": 6,
            "name": "캠페인6",
            "enabled": false,
            "campaign_objective": "LEAD",
            "impressions": 130390,
            "clicks": 6463,
            "ctr": 0.5146,
            "video_views": 3702,
            "vtr": 0.11011
        },
        {
            "id": 7,
            "name": "캠페인7",
            "enabled": false,
            "campaign_objective": "SALES",
            "impressions": 114165,
            "clicks": 3019,
            "ctr": 1.2787,
            "video_views": 628,
            "vtr": 0.40574
        },
        {
            "id": 8,
            "name": "캠페인8",
            "enabled": false,
            "campaign_objective": "BRAND",
            "impressions": 245570,
            "clicks": 1641,
            "ctr": 0.604,
            "video_views": 257,
            "vtr": 0.54237
        },
        {
            "id": 9,
            "name": "캠페인9",
            "enabled": true,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 849045,
            "clicks": 3002,
            "ctr": 0.989,
            "video_views": 2467,
            "vtr": 0.5402
        },
        {
            "id": 10,
            "name": "캠페인10",
            "enabled": false,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 851941,
            "clicks": 4058,
            "ctr": 0.3865,
            "video_views": 1120,
            "vtr": 0.49533
        },
        {
            "id": 11,
            "name": "캠페인1",
            "enabled": true,
            "campaign_objective": "WEBSITE_TRAFFIC",
            "impressions": 944577,
            "clicks": 8577,
            "ctr": 0.1937,
            "video_views": 2576,
            "vtr": 0.83025
        },
        {
            "id": 12,
            "name": "캠페인2",
            "enabled": false,
            "campaign_objective": "WEBSITE_CONVERSIONS",
            "impressions": 923577,
            "clicks": 710,
            "ctr": 0.4175,
            "video_views": 619,
            "vtr": 0.35538
        },
        {
            "id": 13,
            "name": "캠페인3",
            "enabled": true,
            "campaign_objective": "WEBSITE_TRAFFIC",
            "impressions": 588314,
            "clicks": 2373,
            "ctr": 0.6573,
            "video_views": 2209,
            "vtr": 0.8565
        },
        {
            "id": 14,
            "name": "캠페인4",
            "enabled": true,
            "campaign_objective": "APP_INSTALLATION",
            "impressions": 862347,
            "clicks": 3764,
            "ctr": 0.5232,
            "video_views": 4857,
            "vtr": 0.96033
        },
        {
            "id": 15,
            "name": "캠페인5",
            "enabled": false,
            "campaign_objective": "WEBSITE_CONVERSIONS",
            "impressions": 934303,
            "clicks": 7722,
            "ctr": 0.8496,
            "video_views": 1289,
            "vtr": 0.369
        },
        {
            "id": 16,
            "name": "캠페인6",
            "enabled": false,
            "campaign_objective": "LEAD",
            "impressions": 130390,
            "clicks": 6463,
            "ctr": 0.5146,
            "video_views": 3702,
            "vtr": 0.11011
        },
        {
            "id": 17,
            "name": "캠페인7",
            "enabled": false,
            "campaign_objective": "SALES",
            "impressions": 114165,
            "clicks": 3019,
            "ctr": 1.2787,
            "video_views": 628,
            "vtr": 0.40574
        },
        {
            "id": 18,
            "name": "캠페인8",
            "enabled": false,
            "campaign_objective": "BRAND",
            "impressions": 245570,
            "clicks": 1641,
            "ctr": 0.604,
            "video_views": 257,
            "vtr": 0.54237
        },
        {
            "id": 19,
            "name": "캠페인9",
            "enabled": true,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 849045,
            "clicks": 3002,
            "ctr": 0.989,
            "video_views": 2467,
            "vtr": 0.5402
        },
        {
            "id": 20,
            "name": "캠페인10",
            "enabled": false,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 851941,
            "clicks": 4058,
            "ctr": 0.3865,
            "video_views": 1120,
            "vtr": 0.49533
        },
        {
            "id": 21,
            "name": "캠페인6",
            "enabled": false,
            "campaign_objective": "LEAD",
            "impressions": 130390,
            "clicks": 6463,
            "ctr": 0.5146,
            "video_views": 3702,
            "vtr": 0.11011
        },
        {
            "id": 22,
            "name": "캠페인7",
            "enabled": false,
            "campaign_objective": "SALES",
            "impressions": 114165,
            "clicks": 3019,
            "ctr": 1.2787,
            "video_views": 628,
            "vtr": 0.40574
        },
        {
            "id": 23,
            "name": "캠페인8",
            "enabled": false,
            "campaign_objective": "BRAND",
            "impressions": 245570,
            "clicks": 1641,
            "ctr": 0.604,
            "video_views": 257,
            "vtr": 0.54237
        },
        {
            "id": 24,
            "name": "캠페인9",
            "enabled": true,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 849045,
            "clicks": 3002,
            "ctr": 0.989,
            "video_views": 2467,
            "vtr": 0.5402
        },
        {
            "id": 25,
            "name": "캠페인10",
            "enabled": false,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 851941,
            "clicks": 4058,
            "ctr": 0.3865,
            "video_views": 1120,
            "vtr": 0.49533
        },
        {
            "id": 26,
            "name": "캠페인10",
            "enabled": false,
            "campaign_objective": "VIDEO_VIEWS",
            "impressions": 851941,
            "clicks": 4058,
            "ctr": 0.3865,
            "video_views": 1120,
            "vtr": 0.49533
        }
    ],
    "size": 25,
    "total_elements": 50,
    "total_pages": 5,
    "last": false,
    "number": 0,
    "sort": {},
    "number_of_elements": 25,
    "first": true,
    "empty": false
}
// ✅ 캠페인 목록 가져오기 (API가 없으면 Mock 데이터 사용)
export async function fetchCampaigns(page: number = 0, size: number = 25): Promise<CampaignResponse | null> {
    try {
        const response = await api.get<CampaignResponse>('/campaigns', {
            params: { page, size },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);

        // ✅ API가 없을 경우 Mock 데이터 반환
        return new Promise((resolve) => {
            setTimeout(() => resolve(MockCampaign), 500); // 0.5초 딜레이 후 반환
        });
    }
}
// ✅ 캠페인 목록 가져오기
// export async function fetchCampaigns(page: number = 0, size: number = 10): Promise<CampaignResponse | null> {
//     try {
//         const response = await api.get<CampaignResponse>('/campaigns', {
//             params: { page, size },
//         });
//
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching campaigns:', error);
//         return null;
//     }
// }


export default api; // 다른 곳에서도 axios 인스턴스를 재사용 가능
