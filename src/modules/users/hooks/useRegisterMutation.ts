import { useApiMutation } from "@/hooks/useApiMutation";
import { register } from "../api/register";
import { useQueryClient } from "@tanstack/react-query";

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  return useApiMutation({
    mutationFn: register,
    options: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        localStorage.setItem("token", data.accessToken);
      },
    },
  });
}
