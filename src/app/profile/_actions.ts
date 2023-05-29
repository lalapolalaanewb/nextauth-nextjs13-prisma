"use server";

import clientMongo from "@/config/mongo";
import { isVerify } from "@/libs/isVerify";
import { revalidatePath } from "next/cache";
import { APIDefaultReturnType } from "../../../next-auth";

export async function updateProfileName(
  data: string
): Promise<APIDefaultReturnType<undefined>> {
  const verify = await isVerify();
  if (!verify.status)
    return {
      status: 1,
      message: "Unauthorized access! Please login first to continue.",
    };

  try {
    const client = await clientMongo();
    const testCollection = await client.db().collection("test");
    const updateClient = await testCollection.updateOne(
      {
        email: verify.session.user.email,
      },
      {
        $set: {
          name: data,
        },
      }
    );

    if (updateClient.modifiedCount <= 0)
      return {
        status: 1,
        message: "No changes were made. Something went wrong.",
      };

    revalidatePath("/profile");
    return {
      status: 0,
      message: `Successfully update user's name.`,
    };
  } catch (e) {
    console.log(
      "Server Action Error [/app/profile/_actions] - updateProfileName: ",
      e
    );
    return {
      status: 5,
      message: "Server Action Error! Something went wrong.",
    };
  }
}
