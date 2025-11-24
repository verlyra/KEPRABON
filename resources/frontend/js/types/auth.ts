import type { ApiResponseSuccess } from './api';
import { User } from './user';

export interface LoginCredentials {
    nip: string;
    password?: string;
}

export type AuthSuccessBody = null

export type AuthSuccessResponse = ApiResponseSuccess<AuthSuccessBody>;

export interface AuthContext {
    user: User | null;
}