import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: data.message || "Login failed" },
      { status: 401 },
    );

  return NextResponse.json(data);
}
