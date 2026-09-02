"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(180deg,#0E4001_0%,#355B2A_22%,#71804D_45%,#B4AF78_65%,#F4F2DD_100%)]
        px-5
        py-12
        sm:px-8
        sm:py-16
      "
    >
      {/* Decorative background shapes */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-105
          w-105
          rounded-full
          border
          border-[#E4E198]/20
          bg-[#E4E198]/10
          blur-2xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-125
          w-125
          rounded-full
          border
          border-[#F4F2DD]/20
          bg-[#889551]/20
          blur-3xl
        "
      />

      {/* Auth card */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center sm:min-h-[calc(100vh-8rem)]">
        <div
          className="
            w-full
            overflow-hidden
            rounded-4xl
            border
            border-[#E4E198]/30
            bg-[#0E4001]/75
            p-7
            text-[#F4F2DD]
            shadow-[0_30px_100px_rgba(14,64,1,0.30)]
            backdrop-blur-2xl
            backdrop-saturate-150
            sm:p-9
          "
        >
          {/* Glass reflection */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-4xl
              bg-linear-to-br
              from-white/10
              via-transparent
              to-[#E4E198]/8
            "
          />

          <div className="relative z-10">
            {/* Small label */}
            <div className="mb-5 text-center">
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-[#E4E198]
                "
              >
                Brass Collection
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mb-3
                text-center
                font-serif
                text-4xl
                italic
                leading-none
                text-[#F4F2DD]
                sm:text-5xl
              "
            >
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="mx-auto mb-8 max-w-xs text-center text-[11px] leading-5 text-[#F4F2DD]/55">
              {isLogin
                ? "Continue your journey through timeless brass craftsmanship."
                : "Join us and discover thoughtfully crafted brassware."}
            </p>

            {/* Form */}
            {isLogin ? <LoginForm /> : <RegisterForm />}

            {/* Switch authentication mode */}
            <div className="mt-8 border-t border-[#E4E198]/15 pt-6 text-center">
              {isLogin ? (
                <p className="text-[11px] text-[#F4F2DD]/55">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="
                      ml-1
                      font-medium
                      text-[#E4E198]
                      underline
                      underline-offset-4
                      transition
                      hover:text-[#F4F2DD]
                    "
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p className="text-[11px] text-[#F4F2DD]/55">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="
                      ml-1
                      font-medium
                      text-[#E4E198]
                      underline
                      underline-offset-4
                      transition
                      hover:text-[#F4F2DD]
                    "
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}