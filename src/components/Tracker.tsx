"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/app/actions/analytics";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // We log on mount/pathname change
    const referrer = document.referrer;
    recordVisit(pathname, referrer);
  }, [pathname]);

  return null; // This component doesn't render anything
}
