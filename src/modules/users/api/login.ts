import apiClient from "@/services/apiClient";

export interface loginPayload {
    email: string;
    password: string;
}
export interface loginResponse {
    accessToken: string;
    user: {
        email: string;
        id: number;
    };
}

export function login(
    data: loginPayload,
): Promise<loginResponse> {
    return apiClient.post<loginResponse>(`/login`, data);
}
