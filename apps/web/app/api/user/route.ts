import { dbClient } from "@/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PATCH(request: NextApiRequest) {
  const { email, password, first_name, last_name, phone } = request.body;

  await dbClient.user.create({
    email,
    password,
    first_name,
    last_name,
    phone,
  });

  return NextResponse.json(
    { message: "user created successfully" },
    { status: 200 }
  );
}
