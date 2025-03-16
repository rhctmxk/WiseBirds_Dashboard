import { useState, useEffect } from 'react';
import { fetchUsers } from '@/lib/api';
import { UserResponse } from '@/types/user';
import { MockUsers } from '@/mocks/mockDatas';

export function useUsers(page: number = 0, size: number = 25) {
    const [data, setData] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            const userData = await fetchUsers(page, size);
            if (userData) {
                setData(userData);
            } else {
                setData(MockUsers); // ✅ API가 없을 경우 Mock Data 사용
            }
            setLoading(false);
        }

        loadUsers();
    }, [page, size]);

    return { data, loading, error };
}
