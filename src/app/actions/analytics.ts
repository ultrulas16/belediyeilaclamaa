"use server";

import { headers } from "next/headers";
import { logVisit } from "@/lib/db";

export async function recordVisit(path: string, referrer: string) {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") || "unknown";
  const userAgent = headerList.get("user-agent") || "unknown";

  // Prevent logging admin paths
  if (path.startsWith('/admin') || path === '/login') return;

  await logVisit({
    ip,
    path,
    referrer: referrer || "Direct",
    user_agent: userAgent
  });
}
