export interface User {
    id: number;
    email: string;
    name: string;
    last_login_at: string;
}

export interface UserResponse {
    content: User[];
    total_elements: number;
    total_pages: number;
    size: number;
    number: number;
    empty: boolean;
}