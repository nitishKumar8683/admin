import { connect, pool } from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse request body
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Connect to the database
    await connect();

    // Check if user exists
    const [userResults] = await pool
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    const user = userResults[0]; // Assuming only one user with that email

    if (!user) {
      console.log(user);
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 },
      );
    }
    console.log("User exists");

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 },
      );
    }

    // Create JWT token
    const tokenData = {
      id: user.id, // Use `user.id` or the appropriate column name
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Create response
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      tokenData,
    });

    // Set cookies
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    response.cookies.set("role", user.role, { httpOnly: false, path: "/" });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
