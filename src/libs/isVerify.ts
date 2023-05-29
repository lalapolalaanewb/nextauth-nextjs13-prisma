"use server";

/* eslint-disable import/prefer-default-export */
import { getServerSession, type Session } from "next-auth";
import { cookies, headers } from "next/headers";
import { authOptions } from "./auth";

interface IsVerify1Type {
  status: boolean;
  session: Session;
}
interface IsVerify2Type {
  status: false;
}

export async function isVerify(): Promise<IsVerify1Type | IsVerify2Type> {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = {
    getHeader(): void {
      // nothing pass here
    },
    setCookie(): void {
      // nothing pass here
    },
    setHeader(): void {
      // nothing pass here
    },
  };
  // @ts-expect-error [update-this-type] once there's support to use 'req' & 'res' on server actions
  const session = await getServerSession(req, res, authOptions);

  if (session?.user.id)
    return {
      status: true,
      session,
    };

  return {
    status: false,
  };
}
