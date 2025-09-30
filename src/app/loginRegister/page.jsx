"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginZodSchema, userZodSchema } from "@/lib/userZodSchema";
import { useUserContext } from "@/context/userContext";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { login, register, isloginOrRegister } = useUserContext();

  const form = useForm({
    resolver: zodResolver(isLogin ? loginZodSchema : userZodSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      const data = isLogin
        ? await login({ email: values.email, password: values.password })
        : await register({
            name: values.name,
            email: values.email,
            password: values.password,
          });

      if (!data.success) return;
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-950 text-white px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                {...form.register("name")}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isloginOrRegister}
            className={`w-full py-2 rounded bg-amber-600 hover:bg-amber-700 transition font-medium flex items-center justify-center`}
          >
            {isloginOrRegister ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-400 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
