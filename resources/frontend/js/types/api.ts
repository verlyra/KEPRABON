export interface ApiResponseSuccess<T> {
    responseStatus: true;
    responseMessage: string;
    responseBody: T;
}

export interface ApiResponseError {
    responseStatus: false;
    responseMessage: string;
    responseBody: null;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;