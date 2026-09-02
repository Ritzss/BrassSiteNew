/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  /* ----------------------------------------
     Handle OTP paste
  ---------------------------------------- */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    // Only allow numeric OTP values.
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, 6).split("");
    const newOtp = ["", "", "", "", "", ""];

    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the last populated OTP input.
    const lastIndex = pastedOtp.length - 1;

    if (inputs.current[lastIndex]) {
      inputs.current[lastIndex]?.focus();
    }
  };

  /* ----------------------------------------
     Send OTP
  ---------------------------------------- */
  const sendOtp = async () => {
    try {
      setLoading(true);

      await axios.post("/api/auth/send-otp", {
        email,
      });

      setOtpSent(true);

      alert("OTP Generated (Check Terminal)");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed To Send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     Handle individual OTP digit
  ---------------------------------------- */
  const handleOtpChange = (value: string, index: number) => {
    // Only allow one numeric character.
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Automatically move to the next input.
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* ----------------------------------------
     Handle OTP backspace navigation
  ---------------------------------------- */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* ----------------------------------------
     Verify OTP and login
  ---------------------------------------- */
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const finalOtp = otp.join("");

      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      // Store authentication data locally.
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      router.push("/");
      router.refresh();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Email */}
      <div>
        <label
          htmlFor="login-email"
          className="
            mb-2
            block
            text-[9px]
            uppercase
            tracking-[0.22em]
            text-[#E4E198]/70
          "
        >
          Email Address
        </label>

        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="
            w-full
            rounded-2xl
            border
            border-[#E4E198]/20
            bg-white/[0.07]
            px-4
            py-4
            text-sm
            text-[#F4F2DD]
            outline-none
            placeholder:text-[#F4F2DD]/35
            backdrop-blur-md
            transition
            duration-300
            focus:border-[#E4E198]/60
            focus:bg-white/10
            focus:ring-2
            focus:ring-[#E4E198]/10
          "
        />
      </div>

      {/* OTP */}
      {otpSent && (
        <div>
          <label
            className="
              mb-3
              block
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-[#E4E198]/70
            "
          >
            Verification Code
          </label>

          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
                className="
                  aspect-square
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-[#E4E198]/20
                  bg-white/[0.07]
                  text-center
                  text-lg
                  font-semibold
                  text-[#F4F2DD]
                  outline-none
                  backdrop-blur-md
                  transition
                  duration-300
                  focus:border-[#E4E198]/70
                  focus:bg-white/12
                  focus:ring-2
                  focus:ring-[#E4E198]/10
                  sm:text-xl
                "
              />
            ))}
          </div>

          <p className="mt-3 text-[10px] leading-5 text-[#F4F2DD]/35">
            Enter the 6-digit verification code sent to your email.
          </p>
        </div>
      )}

      {/* Main action */}
      {!otpSent ? (
        <button
          type="button"
          onClick={sendOtp}
          disabled={loading}
          className="
            mt-1
            w-full
            rounded-2xl
            bg-[#E4E198]
            px-5
            py-4
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#0E4001]
            shadow-[0_12px_30px_rgba(228,225,152,0.12)]
            transition
            duration-300
            hover:bg-[#F4F2DD]
            hover:shadow-[0_16px_40px_rgba(228,225,152,0.18)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <button
          type="button"
          onClick={verifyOtp}
          disabled={loading}
          className="
            mt-1
            w-full
            rounded-2xl
            bg-[#E4E198]
            px-5
            py-4
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#0E4001]
            shadow-[0_12px_30px_rgba(228,225,152,0.12)]
            transition
            duration-300
            hover:bg-[#F4F2DD]
            hover:shadow-[0_16px_40px_rgba(228,225,152,0.18)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      )}

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E4E198]" />

        <p className="text-[9px] uppercase tracking-[0.16em] text-[#F4F2DD]/35">
          Secure OTP Authentication
        </p>
      </div>
    </div>
  );
}