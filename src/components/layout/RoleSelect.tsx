'use client';

import DropdownMenu from "@/components/ui/DropdownMenu";

interface RoleSelectProps {
    role: string;
    setRole: (role: string) => void;
}

export default function RoleSelect({ role, setRole }: RoleSelectProps) {
    const handleSelect = (selectedRole: string) => {
        localStorage.setItem('role', selectedRole); // ✅ 역할을 localStorage에 저장
        setRole(selectedRole);
        console.log(`Role changed to: ${selectedRole}`);
    }

    const menuItems = [
        { label: 'admin', onClick: () => handleSelect('admin') },
        { label: 'manager', onClick: () => handleSelect('manager') },
        { label: 'viewer', onClick: () => handleSelect('viewer') }
    ]

    return (
        <DropdownMenu defaultLabel={role} menuItems={menuItems} />
    )
}
