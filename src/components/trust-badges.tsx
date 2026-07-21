import { Headset, Shield, Ship, Truck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { type Locale, ui } from "@/lib/i18n";

const icons = [Ship, Headset, Shield, Truck] as const;

export function TrustBadges({ locale }: { locale: Locale }) {
  const copy = ui[locale].trustBadges;
  const items = [
    { title: copy.globalShipping, desc: copy.globalShippingDesc },
    { title: copy.exportSupport, desc: copy.exportSupportDesc },
    { title: copy.qualityGuaranteed, desc: copy.qualityGuaranteedDesc },
    { title: copy.secureTrade, desc: copy.secureTradeDesc },
  ];

  return (
    <section className="border-y border-border/60 bg-white py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="group flex items-center gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-[#eef6f2]">
                  <div className="flex size-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#eef6f2] to-[#d7eadf] text-[#1d6b4f] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
