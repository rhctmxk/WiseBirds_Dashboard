'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { userColumns } from '@/components/user/userColumns';
import { MaterialReactTable } from 'material-react-table';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import UserEditModal from '@/components/user/UserEditModal';
import UserCreateModal from "@/components/user/UserCreateModal";
import { User } from '@/types/user';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';


export default function UserTable() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(25);
    const { data, loading, error, refetch } = useUsers(page, size);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (updatedUser: User) => {
        console.log('Updated User:', updatedUser);
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="p-6">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }

    if (error || !data || data.empty) {
        return <EmptyState message="사용자 데이터가 없습니다." />;
    }

    return (
        <div className="p-3">
            <div className="pb-6">
                <Button variant="contained" onClick={() => setIsCreateModalOpen(true)}>
                    생성
                </Button>
            </div>
            <MaterialReactTable
                columns={userColumns(handleEditUser)} // ✅ userColumns에 handleEditUser 전달
                data={data.content}
                paginationDisplayMode="pages"
                initialState={{
                    pagination: { pageSize: size, pageIndex: page },
                    density: 'compact'
                }}
                muiPaginationProps={{
                    rowsPerPageOptions: [25, 50, 100],
                }}
                localization={{
                    rowsPerPage: '페이지당 사용자 수',
                }}
                onPaginationChange={(updater) => {
                    setPage((prevPage) => {
                        const newPage = typeof updater === 'function' ? updater({ pageIndex: prevPage, pageSize: size }).pageIndex : updater.pageIndex;
                        return newPage;
                    });

                    setSize((prevSize) => {
                        const newSize = typeof updater === 'function' ? updater({ pageIndex: page, pageSize: prevSize }).pageSize : updater.pageSize;
                        return newSize;
                    });
                }}
            />
            {/* 사용자 수정 모달 */}
            <UserEditModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
                onSave={handleSaveUser}
            />
            {/* 사용자 생성 모달 */}
            <UserCreateModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onUserCreated={refetch}
            />
        </div>
    );
}
