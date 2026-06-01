import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { email, otp } =
      await req.json();

    global.tempOtpStore =
      global.tempOtpStore || {};

    const storedOtp =
      global.tempOtpStore[email];

    if (storedOtp !== otp) {

      return NextResponse.json(
        {
          message: "Invalid OTP",
        },
        {
          status: 400,
        }
      );

    }

    // LOWERCASE EMAIL
    const normalizedEmail =
      email.toLowerCase().trim();

    // ADMIN EMAILS
    const adminEmails = [
      "ritanshu951@gmail.com",
      "your@email.com",
    ];

    // CHECK ADMIN
    const isAdmin =
      adminEmails.includes(
        normalizedEmail
      );

    const user = {
      name: isAdmin
        ? "Admin"
        : "Customer",

      email: normalizedEmail,

      role: isAdmin
        ? "admin"
        : "customer",
    };

    delete global.tempOtpStore[email];

    return NextResponse.json({
      success: true,
      token: "temp_token",
      user,
    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }
}