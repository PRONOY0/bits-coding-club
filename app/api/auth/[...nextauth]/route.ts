import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Account, Session } from "next-auth";

export interface CustomJWT extends JWT {
  accessToken?: string;
  idToken?: string;
  role?: string;
}

export interface CustomSession extends Session {
  accessToken?: string;
  user:{
    role?:string;
  } & Session["user"];
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: CustomJWT;
      account?: Account | null;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        // 🎯 Assign a role based on email (Replace with DB logic if needed)
        const adminEmails = ["pronoyroy782@example.com"]; // Example admin email
        token.role = adminEmails.includes(token.email ?? "") ? "admin" : "user";
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomJWT;
    }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role; // ✅ Assign role to session user
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
