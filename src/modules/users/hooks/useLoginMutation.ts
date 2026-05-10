import { useApiMutation } from "@/hooks/useApiMutation";
import { login } from "../api/login";
import { useQueryClient } from "@tanstack/react-query";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: login,
    options: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        localStorage.setItem("token", data.accessToken);
      },
    },
  });
}
