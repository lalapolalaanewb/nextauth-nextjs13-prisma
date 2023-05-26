import { NextResponse } from "next/server";

export interface UserType {
  name: string;
}

export let user = {
  name: "fathi",
  email: "fathi@gmail.com",
  randomKey: "ppp123",
};

export function GET() {
  return NextResponse.json({
    status: 0,
    data: user,
    message: "Getting user profile data",
  });
}
