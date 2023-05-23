import type { NextAuthOptions, Session, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials });
        if (!credentials?.email || !credentials.password) {
          throw new Error(`Email/Password not provived!`);
        }

        if (credentials.email !== "fathi@gmail.com") {
          throw new Error(`Email not exists!`);
        }
        if (credentials.password !== "password") {
          throw new Error(`Password incorrect!`);
        }

        return {
          id: "1",
          email: "fathi@gmail.com",
          name: "fathi",
          randomKey: "Hey cool",
        } satisfies User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.id,
      //     randomKey: token.randomKey,
      //   },
      // };
      const ss: Session = {
        expires: session.expires,
        user: token.user,
      };

      return ss;
    },
    jwt: ({ token, user }) => {
      // if (user) {
      //   const u = user as unknown as any;
      //   return {
      //     ...token,
      //     id: u.id,
      //     randomKey: u.randomKey,
      //   };
      // }
      // return token;

      if (!user) return token;

      return { ...token, user };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
