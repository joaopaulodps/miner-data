"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-gray-500 hover:text-red-600 transition-colors"
    >
      Sair
    </button>
  );
}
