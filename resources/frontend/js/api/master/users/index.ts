import axios from '@/lib/axios';
import { ApiResponseSuccess } from '@/types/api';
import { 
    UserData, CreateUserPayload, UpdateUserPayload, DeleteUserPayload 
} from '@/types/master/users/users';

export const getUsersList = async (): Promise<UserData[]> => {
    const response = await axios.get<ApiResponseSuccess<UserData[]>>('/master/users/list');
    return response.data.responseBody;
};

export const createUser = async (payload: CreateUserPayload): Promise<boolean> => {
    const response = await axios.post<ApiResponseSuccess<boolean>>('/master/users/store', payload);
    return response.data.responseBody;
};

export const updateUser = async (payload: UpdateUserPayload): Promise<null> => {
    const response = await axios.put<ApiResponseSuccess<null>>('/master/users/update', payload);
    return response.data.responseBody;
};

export const deleteUser = async (payload: DeleteUserPayload): Promise<null> => {
    const response = await axios.delete<ApiResponseSuccess<null>>('/master/users/delete', { data: payload });
    return response.data.responseBody;
};