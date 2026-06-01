/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
export default function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const registerUser = async () => {
    setError("");
    setSuccess("");

    // USERNAME
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // PASSWORD
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$._])[A-Za-z\d@#$._]{8,16}$/;

    // VALIDATE USERNAME
    if (!usernameRegex.test(name)) {
      return setError(
        "Username must be 3-16 characters and only contain A-Z, a-z, 0-9 and _",
      );
    }

    // VALIDATE EMAIL
    if (!emailRegex.test(email)) {
      return setError("Invalid Email Address");
    }

    // VALIDATE PASSWORD
    if (!passwordRegex.test(password)) {
      return setError(
        "Password must contain uppercase, lowercase, number, special character and be 8-16 characters long",
      );
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Registered Successfully");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {" "}
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" border border-[#889551] dark:border-[#e4e198] bg-[#f4f2dd] dark:bg-[#889551] text-[#889551] dark:text-[#f4f2dd] p-4 rounded-xl outline-none "
      />{" "}
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail( e.target.value.toLowerCase() ) }
        className=" border border-[#889551] dark:border-[#e4e198] bg-[#f4f2dd] dark:bg-[#889551] text-[#889551] dark:text-[#f4f2dd] p-4 rounded-xl outline-none "
      />{" "}
      <div className="relative">
        {" "}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" w-full border border-[#889551] dark:border-[#e4e198] bg-[#f4f2dd] dark:bg-[#889551] text-[#889551] dark:text-[#f4f2dd] p-4 pr-14 rounded-xl outline-none "
        />{" "}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className=" absolute right-4 top-1/2 -translate-y-1/2 text-[#889551] dark:text-[#f4f2dd] "
        >
          {" "}
          {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}{" "}
        </button>{" "}
      </div>{" "}
      {/* ERROR MESSAGE */}
      {error && (
        <div
          className="
      bg-red-100
      dark:bg-red-900/30
      border
      border-red-400
      text-red-700
      dark:text-red-300
      px-4
      py-3
      rounded-xl
      text-sm
    "
        >
          {error}
        </div>
      )}
      {/* SUCCESS MESSAGE */}
      {success && (
        <div
          className="
      bg-green-100
      dark:bg-green-900/30
      border
      border-green-400
      text-green-700
      dark:text-green-300
      px-4
      py-3
      rounded-xl
      text-sm
    "
        >
          {success}
        </div>
      )}
      <button
        onClick={registerUser}
        disabled={loading}
        className=" bg-[#889551] dark:bg-[#e4e198] text-[#f4f2dd] dark:text-[#889551] font-semibold p-4 rounded-xl "
      >
        {" "}
        {loading ? "Registering..." : "Register"}{" "}
      </button>{" "}
    </div>
  );
}
