import mongoClient from "@/config/mongo";
import { authOptions } from "@/libs/auth";
import { Session, getServerSession } from "next-auth";
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
      return new Response(
        JSON.stringify({
          status: 1,
          message: "User not found!",
        }),
        { status: 400 }
      );

    return new Response(
      JSON.stringify({
        status: 0,
        data: user,
        message: "Successfully get user data",
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error("API Error [/api/profile] - GET: ", e);
    return new Response(
      JSON.stringify({
        status: 5,
        message: "API Error! Something went wrong.",
      }),
      { status: 500 }
    );
  }
}
