import { TypeUser } from ".";

export interface LoginResponse {
    id: string;
    fullName: string;
    userName: string;
    role: TypeUser;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    token: string;
}

export interface UsersRespose {
    id: string;
    fullName: string;
    userName: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}


export interface ErrorResponse {
    message: Array<string>;
    error: string;
    statusCode: number;
}
