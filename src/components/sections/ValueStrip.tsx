import { Infinity as InfinityIcon, Wallet, Wifi, Headphones } from "lucide-react";
import type { ValuePoint } from "@/types";

const iconMap: Record<string, typeof Wifi> = {
  instalasi: Wifi,
  fup: InfinityIcon,
  harga: Wallet,
  support: Headphones,
};

type ValueStripProps = {
  points: ValuePoint[];
};

export function ValueStrip({ points }: ValueStripProps) {
  return (
    <section aria-label="Keunggulan singkat" className="border-b border-line bg-mist">
      <div className="wrap grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => {
          const Icon = iconMap[point.id] ?? Wifi;
          return (
            <div key={point.id} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold not-italic text-ink">{point.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
