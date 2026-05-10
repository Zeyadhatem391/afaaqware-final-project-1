"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/modules/users/schemas/validation";
import { useLoginMutation } from "@/modules/users/hooks/useLoginMutation";

type FormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useLoginMutation();

  function onSubmit(data: FormValues) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        reset();
        router.push("/");
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-500 text-white"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-indigo-500 text-white"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

          {loginMutation.isError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {(loginMutation.error as Error).message}
            </p>
          )}
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
