"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Clock3, MapPinOff, MessageCircle, Search } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { checkCoverage } from "@/lib/data";
import { coverageSchema } from "@/lib/validation";
import { buildCoverageMessage, buildQueueMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CoverageResult } from "@/types";

type CoverageCheckerProps = {
  note: string;
  variant?: "compact" | "full";
};

type FormErrors = Partial<Record<"kelurahan" | "kecamatan" | "alamat", string>>;

const statusStyles: Record<CoverageResult["status"], string> = {
  aktif: "border-blue bg-surface",
  perluasan: "border-line bg-surface",
  antrian: "border-line bg-surface",
};

export function CoverageChecker({ note, variant = "compact" }: CoverageCheckerProps) {
  const [values, setValues] = useState({ kelurahan: "", kecamatan: "", alamat: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [pending, setPending] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  function update(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const parsed = coverageSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setPending(true);
    const coverage = await checkCoverage(parsed.data.kelurahan, parsed.data.kecamatan);
    setResult(coverage);
    setPending(false);

    // Di layar kecil hasil muncul di bawah form: pastikan terlihat dan terfokus.
    requestAnimationFrame(() => {
      const node = resultRef.current;
      if (!node) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      node.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
      node.focus({ preventScroll: true });
    });
  }

  const Icon =
    result?.status === "aktif"
      ? CheckCircle2
      : result?.status === "perluasan"
        ? Clock3
        : result?.status === "antrian"
          ? MapPinOff
          : AlertCircle;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="kelurahan"
            label="Kelurahan"
            required
            placeholder="Contoh: Sidomulyo"
            value={values.kelurahan}
            onChange={(event) => update("kelurahan", event.target.value)}
            error={errors.kelurahan}
            autoComplete="address-level3"
          />
          <TextField
            id="kecamatan"
            label="Kecamatan"
            required
            placeholder="Contoh: Samarinda Ilir"
            value={values.kecamatan}
            onChange={(event) => update("kecamatan", event.target.value)}
            error={errors.kecamatan}
            autoComplete="address-level2"
          />
        </div>

        {variant === "full" ? (
          <TextField
            id="alamat-cek"
            label="Alamat lengkap"
            placeholder="Nama jalan, nomor rumah, patokan"
            value={values.alamat}
            onChange={(event) => update("alamat", event.target.value)}
            error={errors.alamat}
            hint="Alamat membantu teknisi memastikan titik pemasangan."
            autoComplete="street-address"
          />
        ) : null}

        <div>
          <Button type="submit" disabled={pending}>
            <Search className="h-4 w-4" aria-hidden="true" />
            {pending ? "Memeriksa..." : "Cek jangkauan"}
          </Button>
        </div>
      </form>

      <div aria-live="polite" role="status">
        {result ? (
          <div
            ref={resultRef}
            tabIndex={-1}
            className={`rounded-lg border p-5 outline-none ${statusStyles[result.status]}`}
          >
            <div className="flex items-start gap-3">
              <Icon
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  result.status === "aktif" ? "text-blue" : "text-muted"
                }`}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-lg font-semibold not-italic text-ink">{result.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{result.message}</p>

                {result.matchedArea ? (
                  <p className="mt-3 text-xs text-muted">
                    Data contoh: Kel. {result.matchedArea.kelurahan}, Kec. {result.matchedArea.kecamatan} —{" "}
                    {result.status === "aktif"
                      ? "terjangkau"
                      : result.status === "perluasan"
                        ? "dalam perluasan"
                        : "belum tersedia"}
                    .
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-muted">
                    Area tidak ditemukan pada data contoh, dianggap belum tersedia.
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  {result.status === "aktif" ? (
                    <ButtonLink href="/daftar" size="md">
                      Daftar sekarang
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      href={buildWhatsAppUrl({
                        text:
                          result.status === "antrian"
                            ? buildQueueMessage(values.kelurahan, values.kecamatan)
                            : buildCoverageMessage(values.kelurahan, values.kecamatan),
                      })}
                      external
                      size="md"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {result.status === "antrian" ? "Masuk antrean via WhatsApp" : "Tanya via WhatsApp"}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="rounded-lg border border-dashed border-line p-5 outline-none"
          >
            <h3 className="text-base font-semibold not-italic text-ink">Hasil pemeriksaan</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Masukkan kelurahan dan kecamatan, lalu tekan Cek jangkauan. Hasil akan muncul di sini
              dengan salah satu status: terjangkau, dalam perluasan, atau belum tersedia.
            </p>
            <p className="mt-3 text-xs text-muted">{note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
