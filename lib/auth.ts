import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export interface CustomJWT extends JWT {
  accessToken?: string;
  accessTokenExpires: number;
  idToken?: string;
  refreshToken?: string;
  role?: string;
}

const adminEmails = ["pronoyroy782@gmail.com"];

export interface CustomSession extends Session {
  accessToken?: string;
  user: {
    role?: string;
  } & Session["user"];
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
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
    async jwt({ token, account, profile }) {
      if (account && profile) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at! * 1000,
          refreshToken: account.refresh_token,
          role: adminEmails.includes(token.email ?? "") ? "admin" : "user",
          name: profile.name,
          email: profile.email,
          image: profile.image,
        } as CustomJWT;
      }

      if (Date.now() < (token as CustomJWT).accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token as CustomJWT);
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: (token as CustomJWT).accessToken,
        user: {
          ...session.user,
          role: (token as CustomJWT).role,
        },
      } satisfies Session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

async function refreshAccessToken(token: CustomJWT) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const body = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      refresh_token: token.refreshToken as string,
      grant_type: "refresh_token",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Convert to ms
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
