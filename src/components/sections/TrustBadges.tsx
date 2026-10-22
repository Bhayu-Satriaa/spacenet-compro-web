import { ShieldCheck } from "lucide-react";
import type { TrustPoint } from "@/types";

type TrustBadgesProps = {
  points: TrustPoint[];
};

export function TrustBadges({ points }: TrustBadgesProps) {
  return (
    <section aria-labelledby="kepercayaan" className="border-b border-line bg-mist">
      <div className="wrap py-12 sm:py-16">
        <h2 id="kepercayaan" className="text-xl sm:text-2xl">
          Keanggotaan dan layanan
        </h2>
        <p className="measure mt-3 text-sm leading-relaxed text-muted">
          SpaceNet terdaftar sebagai anggota APJII Pengurus Wilayah Kalimantan Timur. Berikut
          keterangan resmi yang dapat kami tampilkan.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point.id}
              className="flex items-start gap-3 rounded-lg border border-line bg-surface p-5"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold not-italic text-ink">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.description}</p>
                {point.needsAsset ? (
                  <p className="mt-2 text-xs text-muted">
                    TODO: logo resmi APJII belum tersedia dan akan ditambahkan setelah file diberikan
                    pemilik.
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-muted">
          Logo klien atau mitra belum ditampilkan karena belum ada daftar resmi yang boleh
          dipublikasikan.
        </p>
      </div>
    </section>
  );
}
