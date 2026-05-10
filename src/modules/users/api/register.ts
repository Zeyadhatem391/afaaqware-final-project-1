import apiClient from "@/services/apiClient";

export interface registerPayload {
  name: string;
  email: string;
  password: string;
}
export interface registerResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}

export function register(
  data: registerPayload,
): Promise<registerResponse> {
  return apiClient.post<registerResponse>(`/register`, data);
}
