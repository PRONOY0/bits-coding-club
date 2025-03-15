import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Correct import

const handler = NextAuth(authOptions);

export const GET = async (req: Request) => handler(req);
export const POST = async (req: Request) => handler(req);
