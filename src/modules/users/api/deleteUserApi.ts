import apiClient from "@/services/apiClient";

export function deleteUser(id: number): Promise<void> {
  return apiClient.delete<void>(`/users/${id}`);
}
