import { Sparkles } from "lucide-react";

type PromoBannerProps = {
  label: string;
  note: string;
};

export function PromoBanner({ label, note }: PromoBannerProps) {
  return (
    <div className="bg-blue text-onblue">
      <div className="wrap flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-xs font-medium sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="font-semibold">{label}</span>
        <span aria-hidden="true" className="opacity-60">
          ·
        </span>
        <span>{note}</span>
      </div>
    </div>
  );
}
