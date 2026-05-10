import apiClient from "@/services/apiClient";

export interface EditUserPayload {
    name: string;
}

export interface EditUserResponse {
    id: number;
    name: string;
    email: string;
}

export function editUserApi(
    id: number,
    data: EditUserPayload
): Promise<EditUserResponse> {
    return apiClient.patch(`/users/${id}`, data)
}