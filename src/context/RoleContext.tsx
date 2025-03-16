// 📁 context/RoleContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// ✅ Role 타입 정의
type Role = 'admin' | 'manager' | 'viewer';

interface RoleContextType {
    role: Role;
    setRole: (role: Role) => void;
}

// ✅ Context 생성
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// ✅ Provider 컴포넌트
export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<Role>('admin'); // 기본값 'admin'

    useEffect(() => {
        const storedRole = (localStorage.getItem('role') as Role) || 'admin';
        setRole(storedRole);
    }, []);

    const updateRole = (newRole: Role) => {
        localStorage.setItem('role', newRole);
        setRole(newRole);
    };

    return <RoleContext.Provider value={{ role, setRole: updateRole }}>{children}</RoleContext.Provider>;
};

// ✅ Role 사용 훅
export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
