import mongoClient from "@/config/mongo";
import { authOptions } from "@/libs/auth";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { DefaultUserType } from "../../../../next-auth";

export async function GET() {
  const session = (await getServerSession(authOptions)) as NonNullable<Session>;

  try {
    const client = await mongoClient();
    const testCollection = await client.db().collection("test");
    const user = await testCollection.findOne<DefaultUserType>({
      email: session.user.email,
    });

    if (!user)
      return NextResponse.json({
        status: 1,
        message: "User not found!",
      });

    return NextResponse.json({
      status: 0,
      data: user,
      message: "Successfully get user data",
    });
  } catch (e) {
    console.error("API Error [/api/profile] - GET: ", e);
    return NextResponse.json({
      status: 5,
      message: "API Error! Something went wrong.",
    });
  }
}
