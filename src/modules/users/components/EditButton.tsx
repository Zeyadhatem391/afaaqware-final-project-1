"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FileEdit } from "lucide-react";
import useEditUser from "../hooks/useEditUser";

interface FormValues {
  name: string;
}

export default function EditButton({
  id,
  currentName,
}: {
  id: number;
  currentName: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useEditUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: currentName,
    },
  });

 
  const onSubmit = (data: FormValues) => {
    mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpen(false);
          reset(); 
        },
      }
    );
  };

  return (
    <>
      <FileEdit
        size={18}
        onClick={() => setOpen(true)}
        className="cursor-pointer text-blue-400 hover:text-blue-500 transition"
      />

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="rounded-xl p-6 w-80 shadow-lg bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Edit Name
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg text-indigo-400 hover:text-indigo-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}