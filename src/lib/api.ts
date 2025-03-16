import axios from 'axios';

// API 기본 URL 설정
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 유저 정보 가져오기
export async function fetchUser() {
    try {
        const response = await api.get('/api/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export default api; // 다른 곳에서도 axios 인스턴스를 재사용 가능
