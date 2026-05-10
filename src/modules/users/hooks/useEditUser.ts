import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserApi, EditUserPayload } from "../api/editUserApi";

export default function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EditUserPayload }) =>
            editUserApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}