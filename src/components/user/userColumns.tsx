import { MRT_ColumnDef } from 'material-react-table';
import { User } from '@/types/user';
import dayjs from 'dayjs';
import { Button } from '@mui/material';

const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
};

export const userColumns = (handleEditUser: (user: User) => void): MRT_ColumnDef<User>[] => [
    {
        accessorKey: 'email',
        header: '이메일',
        size: 250,
        enableSorting: true,
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
    },
    {
        accessorKey: 'name',
        header: '이름',
        size: 200,
        enableSorting: true,
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
    },
    {
        accessorKey: 'last_login_at',
        header: '마지막 로그인',
        size: 180,
        enableSorting: true,
        muiTableHeadCellProps: { sx: { textAlign: 'left' } },
        Cell: ({ cell }) => <div className="text-center">{formatDate(cell.getValue<string>())}</div>,
    },
    {
        accessorKey: 'actions',
        header: '수정',
        size: 100,
        enableSorting: false,
        muiTableHeadCellProps: { sx: { textAlign: 'center' } },
        Cell: ({ row }) => (
            <Button
                variant="outlined"
                size="small"
                onClick={() => handleEditUser(row.original)} // ✅ 수정 가능하도록 변경
            >
                수정
            </Button>
        ),
    },
];
