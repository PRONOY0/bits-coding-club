"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInOutButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Sign In with Google
    </button>
  );
}
