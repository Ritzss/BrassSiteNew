import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const {
      name,
      email,
      password,
    } = await req.json();

    // USERNAME
    const usernameRegex =
      /^[a-zA-Z0-9_]{3,16}$/;

    // EMAIL
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // PASSWORD
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$._])[A-Za-z\d@#$._]{8,16}$/;

    // VALIDATE USERNAME
    if (!usernameRegex.test(name)) {

      return NextResponse.json(
        {
          message:
            "Invalid Username",
        },
        {
          status: 400,
        }
      );

    }

    // VALIDATE EMAIL
    if (!emailRegex.test(email)) {

      return NextResponse.json(
        {
          message:
            "Invalid Email",
        },
        {
          status: 400,
        }
      );

    }

    // VALIDATE PASSWORD
    if (!passwordRegex.test(password)) {

      return NextResponse.json(
        {
          message:
            "Invalid Password Format",
        },
        {
          status: 400,
        }
      );

    }

    console.log({
      name,
      email,
      password,
    });

    return NextResponse.json({
      success: true,
      message:
        "Registered Successfully",
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