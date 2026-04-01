import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Input validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, card_name } = body;

    // Validation
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!card_name || typeof card_name !== "string") {
      return NextResponse.json(
        { message: "Card name is required" },
        { status: 400 }
      );
    }

    if (card_name.trim().length === 0 || card_name.length > 200) {
      return NextResponse.json(
        { message: "Card name must be between 1 and 200 characters" },
        { status: 400 }
      );
    }

    // Database insertion
    const result = await db.query(
      "INSERT INTO submissions(user_email, card_name, status) VALUES($1, $2, $3) RETURNING id",
      [email.toLowerCase(), card_name.trim(), "pending"]
    );

    return NextResponse.json(
      {
        message: "Card submitted successfully",
        submission_id: result.rows[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}