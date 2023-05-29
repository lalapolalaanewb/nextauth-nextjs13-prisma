import type { Session as NextAuthSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

export interface DefaultUserType {
  id: string;
  email?: string | null;
  name?: string | null;
  randomKey: string;
  image?: string | null;
}

export interface APIDefaultReturnType<T> {
  status: number;
  data?: T;
  message: string;
}

export interface DefaultActionReturnType<T> {
  status: number;
  data?: T;
  message?: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context
   */
  interface Session extends NextAuthSession {
    user: DefaultUserType;
  }

  interface User extends NextAuthTransform, DefaultUserType {}
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT extends NextAuthJWT {
    user: DefaultUserType;
  }
}
