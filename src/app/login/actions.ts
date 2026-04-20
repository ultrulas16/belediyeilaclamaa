"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string) {
  // Use environment variable or default
  const adminPassword = process.env.ADMIN_PASSWORD || "belediye2026";

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Geçersiz şifre." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
