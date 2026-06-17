"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className=" min-h-screen flex items-center justify-center bg-[#f4f2dd] dark:bg-[#889551] transition-colors duration-300 px-5 ">
      <div className=" w-full max-w-md bg-[#e4e198] dark:bg-[#5f6b35] rounded-3xl shadow-2xl p-8 border border-[#889551] dark:border-[#e4e198] ">
        <h1 className=" text-3xl font-extrabold text-center mb-8 text-[#889551] dark:text-[#f4f2dd] ">
          {isLogin ? "Welcome Back" : "Create Account"}{" "}
        </h1>
        {isLogin ? <LoginForm /> : <RegisterForm />}{" "}
        <div className="mt-8 text-center">
          {isLogin ? (
            <p className=" text-[#889551] dark:text-[#f4f2dd] ">
              New here?
              <button
                onClick={() => setIsLogin(false)}
                className=" font-semibold underline hover:opacity-80 transition "
              >
                Create Account
              </button>
            </p>
          ) : (
            <p className=" text-[#889551] dark:text-[#f4f2dd] ">
              Already registered?
              <button
                onClick={() => setIsLogin(true)}
                className=" font-semibold underline hover:opacity-80 transition "
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
