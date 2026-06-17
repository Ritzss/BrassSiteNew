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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    // ONLY NUMBERS
    if (!/^\d+$/.test(pastedData)) return;
    const pastedOtp = pastedData.slice(0, 6).split("");
    const newOtp = ["", "", "", "", "", ""];
    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    // FOCUS LAST FILLED
    const lastIndex = pastedOtp.length - 1;

    if (inputs.current[lastIndex]) {
      inputs.current[lastIndex]?.focus();
    }
  };
  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/send-otp", { email });
      setOtpSent(true);
      alert("OTP Generated (Check Terminal)");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed To Send OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const finalOtp = otp.join("");
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp: finalOtp,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login Successful");
      if (res.data.user.role === "admin") {
        router.push("/");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        type="email"
        placeholder="Enter Email"
        className=" border border-[#889551] dark:border-[#e4e198] bg-[#f4f2dd] dark:bg-[#889551] text-[#889551] dark:text-[#f4f2dd] placeholder:text-[#889551]/70 dark:placeholder:text-[#f4f2dd]/70 p-4 rounded-xl outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      {otpSent && (
        <div className="flex justify-between gap-2">
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
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className=" w-12 h-14 text-center text-xl font-bold border border-[#889551] dark:border-[#e4e198] bg-[#f4f2dd] dark:bg-[#889551] text-[#889551] dark:text-[#f4f2dd] rounded-xl outline-none"
            />
          ))}
        </div>
      )}
      {!otpSent ? (
        <button
          onClick={sendOtp}
          disabled={loading}
          className=" bg-[#889551] dark:bg-[#e4e198] text-[#f4f2dd] dark:text-[#889551] font-semibold p-4 rounded-xl "
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      ) : (
        <button
          onClick={verifyOtp}
          disabled={loading}
          className=" bg-[#889551] dark:bg-[#e4e198] text-[#f4f2dd] dark:text-[#889551] font-semibold p-4 rounded-xl "
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      )}
    </div>
  );
}
