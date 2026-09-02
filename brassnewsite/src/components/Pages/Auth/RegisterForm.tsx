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

    // Username: 3-16 characters, letters, numbers and underscore only.
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;

    // Basic email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password:
    // - 8-16 characters
    // - at least one lowercase letter
    // - at least one uppercase letter
    // - at least one number
    // - at least one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$._])[A-Za-z\d@#$._]{8,16}$/;

    // Validate username.
    if (!usernameRegex.test(name)) {
      return setError(
        "Username must be 3-16 characters and only contain A-Z, a-z, 0-9 and _",
      );
    }

    // Validate email.
    if (!emailRegex.test(email)) {
      return setError("Invalid email address");
    }

    // Validate password.
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

      setSuccess("Registered successfully");

      // Clear form after successful registration.
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(
        error?.response?.data?.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label
          htmlFor="register-name"
          className="
            mb-2
            block
            text-[9px]
            uppercase
            tracking-[0.22em]
            text-[#E4E198]/70
          "
        >
          Username
        </label>

        <input
          id="register-name"
          type="text"
          placeholder="Enter your username"
          value={name}
          autoComplete="username"
          onChange={(e) => setName(e.target.value)}
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

      {/* Email */}
      <div>
        <label
          htmlFor="register-email"
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
          id="register-email"
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

      {/* Password */}
      <div>
        <label
          htmlFor="register-password"
          className="
            mb-2
            block
            text-[9px]
            uppercase
            tracking-[0.22em]
            text-[#E4E198]/70
          "
        >
          Password
        </label>

        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-[#E4E198]/20
              bg-white/[0.07]
              px-4
              py-4
              pr-14
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

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[#E4E198]/60
              transition
              hover:text-[#E4E198]
            "
          >
            {showPassword ? (
              <FiEyeOff size={19} />
            ) : (
              <FiEye size={19} />
            )}
          </button>
        </div>

        <p className="mt-2 text-[9px] leading-4 text-[#F4F2DD]/35">
          8-16 characters with uppercase, lowercase, number and special character.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="
            rounded-2xl
            border
            border-red-300/20
            bg-red-950/20
            px-4
            py-3
            text-[10px]
            leading-5
            text-red-200
            backdrop-blur-md
          "
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div
          role="status"
          className="
            rounded-2xl
            border
            border-[#E4E198]/20
            bg-[#E4E198]/10
            px-4
            py-3
            text-[10px]
            leading-5
            text-[#E4E198]
            backdrop-blur-md
          "
        >
          {success}
        </div>
      )}

      {/* Register button */}
      <button
        type="button"
        onClick={registerUser}
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
        {loading ? "Registering..." : "Create Account"}
      </button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E4E198]" />

        <p className="text-[9px] uppercase tracking-[0.16em] text-[#F4F2DD]/35">
          Secure Account Registration
        </p>
      </div>
    </div>
  );
}