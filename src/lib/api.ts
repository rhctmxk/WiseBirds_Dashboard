import axios from 'axios';
import { CampaignResponse } from "@/types/campaign";
import { MockUser, MockCampaigns, MockUsers } from '@/mocks/mockDatas';
import { UserResponse } from "@/types/user";

// API 기본 URL 설정
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const USE_MOCK = true; // ✅ Mock 데이터 활성화 여부

// ✅ 공통 API 요청 함수
async function fetchData<T>(endpoint: string, mockData: T, params: object = {}): Promise<T | null> {
    if (USE_MOCK) {
        console.log(`🚀 Using Mock Data for ${endpoint}`);
        return new Promise((resolve) => setTimeout(() => resolve(mockData), 500)); // ✅ 0.5초 딜레이 후 반환
    }

    try {
        const response = await api.get<T>(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error(`❌ Error fetching data from ${endpoint}:`, error);

        // ✅ API 실패 시에도 Mock 데이터 반환 (실제 운영 환경에서는 주석 처리 가능)
        return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
    }
}

// ✅ 유저 정보 가져오기
export async function fetchUser() {
    return fetchData('/auth/me', MockUser);
}

// ✅ 캠페인 목록 가져오기
export async function fetchCampaigns(page: number = 0, size: number = 25): Promise<CampaignResponse | null> {
    return fetchData<CampaignResponse>('/campaigns', MockCampaigns, { page, size });
}


// ✅ 캠페인 상태 업데이트 API 호출 (Hook 제거)
export async function updateCampaignStatus(id: number, enabled: boolean): Promise<boolean> {
    if (!id) {
        console.error('Error: Campaign ID is required.');
        return false;
    }

    try {
        const response = await axios.patch<{ result: boolean; id: number }>(`/api/campaigns/${id}`, {
            enabled,
        });

        if (response.data.result) {
            console.log(`✅ 캠페인 ${id} 업데이트 성공`);
            return true;
        } else {
            console.error(`❌ 캠페인 ${id} 업데이트 실패`);
            return false;
        }
    } catch (error) {
        console.error(`❌ 캠페인 ${id} 상태 업데이트 중 오류 발생:`, error);
        throw new Error(`캠페인 ${id} 상태를 변경하는 동안 오류가 발생했습니다.`);
    }
}

// ✅ 사용자 목록 가져오기 (Mock 데이터 적용)
export async function fetchUsers(page: number = 0, size: number = 25): Promise<UserResponse | null> {
    if (USE_MOCK) {
        console.log('🚀 Using Mock Data for /users');
        return new Promise((resolve) => setTimeout(() => resolve(MockUsers), 500));
    }

    try {
        const response = await api.get<UserResponse>('/users', {
            params: { page, size },
        });

        return response.data;
    } catch (error) {
        console.error('❌ Error fetching user data:', error);

        // ✅ API 실패 시에도 Mock 데이터 반환 (실제 운영 환경에서는 주석 처리 가능)
        return new Promise((resolve) => setTimeout(() => resolve(MockUsers), 500));
    }
}


export default api; // 다른 곳에서도 axios 인스턴스를 재사용 가능
