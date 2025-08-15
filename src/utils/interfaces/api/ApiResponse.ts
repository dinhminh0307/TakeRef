export interface ApiResponse {
    data?: any;
    headers: Headers;
    status: number;
    ok: boolean;
    error?: string;
}