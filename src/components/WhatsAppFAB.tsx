"use client";

import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function WhatsAppFAB() {
  return (
    <a 
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-40 group"
    >
      <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/40 transition-all"></div>
      <div className="relative bg-green-600 text-white p-4 lg:p-5 rounded-full shadow-2xl shadow-green-900/40 transform transition-all group-hover:scale-110 group-hover:-rotate-12 flex items-center justify-center">
        <MessageSquare size={32} fill="currentColor" />
        <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-black shadow-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap border border-gray-100">
          HALK SAĞLIĞI WHATSAPP HATTI
        </span>
      </div>
    </a>
  );
}
