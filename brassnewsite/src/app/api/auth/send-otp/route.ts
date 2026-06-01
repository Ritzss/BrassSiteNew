import { NextResponse } from "next/server";

declare global {
  var tempOtpStore: Record<string, string> | undefined;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(
      ` ================================= OTP FOR ${email}: ${otp} ================================= `,
    );
    global.tempOtpStore = global.tempOtpStore || {};
    global.tempOtpStore[email] = otp;
    return NextResponse.json({ success: true, message: "OTP Generated" });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
