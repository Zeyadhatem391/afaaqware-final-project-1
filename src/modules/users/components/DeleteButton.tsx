"use client";

import { FiTrash2 } from "react-icons/fi";
import { useDeleteUser } from "../hooks/useDeleteUser";

export default function DeleteButton({ id }: { id: number }) {
  const deleteMutation = useDeleteUser();

  function handleDelete() {
    deleteMutation.mutate(id);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      <FiTrash2
        className="text-red-400 hover:text-red-500 cursor-pointer transition"
        size={18}
      />
    </button>
  );
}