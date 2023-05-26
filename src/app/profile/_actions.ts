"use server";

import { revalidatePath } from "next/cache";
import { user } from "../api/profile/route";

export async function updateProfileName(data: string): Promise<void> {
  user.name = data;

  revalidatePath("/profile");
}
