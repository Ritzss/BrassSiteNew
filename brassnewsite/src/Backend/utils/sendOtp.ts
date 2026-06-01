import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
});
export const sendOTP = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Login OTP",
    html: ` <h2>Your OTP is: ${otp}</h2> <p>Valid for 5 minutes</p> `,
  });
};
