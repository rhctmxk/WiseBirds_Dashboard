import { useState, useEffect } from 'react';
import { fetchUser } from '@/lib/api';

export interface User {
    id: number;
    email: string;
    name: string;
    company: {
        id: number;
        name: string;
    };
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            setLoading(true);
            const userData = await fetchUser();
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        }

        loadUser();
    }, []);

    return { user, loading };
}
