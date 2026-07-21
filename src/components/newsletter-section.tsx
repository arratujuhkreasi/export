"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { type Locale, ui } from "@/lib/i18n";

export function NewsletterSection({ locale }: { locale: Locale }) {
  const copy = ui[locale].newsletter;
  const [email, setEmail] = useState("");

  return (
    <section className="bg-gradient-to-r from-[#1d6b4f] via-[#1d6b4f] to-[#2a9d6f]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-white sm:text-2xl">{copy.title}</h2>
          <p className="mt-1 text-sm text-white/60">{copy.description}</p>
        </div>
        <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
          <input
            type="email"
            placeholder={copy.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 flex-1 rounded-full border-0 bg-white/15 px-5 text-sm text-white placeholder:text-white/40 backdrop-blur-sm outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-white/30"
          />
          <Button
            type="button"
            className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-[#1d6b4f] shadow-lg hover:bg-white/90"
            onClick={() => {
              if (email) setEmail("");
            }}
          >
            {copy.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
