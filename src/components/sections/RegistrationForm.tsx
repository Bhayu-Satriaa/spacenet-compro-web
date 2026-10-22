"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { submitRegistration } from "@/lib/data";
import { registrationSchema, type RegistrationFormValues } from "@/lib/validation";
import type { Package } from "@/types";

type RegistrationFormProps = {
  packages: Package[];
  defaultPackageId: Package["id"];
};

type SummaryItem = { field: keyof RegistrationFormValues; label: string; message: string };

const fieldLabels: Record<string, string> = {
  nama: "Nama lengkap",
  whatsapp: "Nomor WhatsApp",
  alamat: "Alamat pemasangan",
  paketId: "Paket",
  tanggalPasang: "Rencana tanggal pasang",
  catatan: "Catatan",
};

export function RegistrationForm({ packages, defaultPackageId }: RegistrationFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryItem[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      nama: "",
      whatsapp: "",
      alamat: "",
      paketId: defaultPackageId,
      tanggalPasang: "",
      catatan: "",
    },
  });

  // Setelah ringkasan galat ter-render, pindahkan fokus ke sana.
  useEffect(() => {
    if (summary.length === 0) return;
    document.getElementById("ringkasan-galat")?.focus();
  }, [summary]);

  function focusField(field: string) {
    const el = document.getElementById(field);
    if (!el) return;
    el.focus();
    el.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  async function onSubmit(values: RegistrationFormValues) {
    setFormError(null);
    setStatus(null);
    setSummary([]);
    clearErrors();

    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      const items: SummaryItem[] = [];
      const seen = new Set<string>();

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field !== "string") continue;

        setError(field as keyof RegistrationFormValues, { message: issue.message });

        // Satu baris ringkasan per kolom, walau satu kolom punya beberapa galat.
        if (!seen.has(field)) {
          seen.add(field);
          items.push({
            field: field as keyof RegistrationFormValues,
            label: fieldLabels[field] ?? field,
            message: issue.message,
          });
        }
      }

      setSummary(items);
      return;
    }

    const pkg = packages.find((item) => item.id === parsed.data.paketId);
    if (!pkg) {
      setFormError("Paket yang dipilih tidak ditemukan. Muat ulang halaman ini.");
      return;
    }

    setStatus("Menyiapkan pesan WhatsApp...");
    const { whatsappUrl } = await submitRegistration(parsed.data, pkg);
    setStatus("Membuka WhatsApp. Jika tidak terbuka otomatis, gunakan tautan di bawah.");
    window.location.assign(whatsappUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {summary.length > 0 ? (
        <div
          id="ringkasan-galat"
          tabIndex={-1}
          role="alert"
          aria-labelledby="ringkasan-galat"
          className="rounded border border-red-300 bg-red-50 px-4 py-3 outline-none dark:border-red-900 dark:bg-red-950"
        >
          <h2
            id="ringkasan-galat"
            className="text-sm font-semibold not-italic text-red-800 dark:text-red-100"
          >
            Ada {summary.length} isian yang perlu diperbaiki
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {summary.map((item) => (
              <li key={item.field}>
                <a
                  href={`#${item.field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    focusField(item.field);
                  }}
                  className="text-red-800 underline underline-offset-2 hover:text-red-900 dark:text-red-100 dark:hover:text-white"
                >
                  {item.label}: {item.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {formError ? (
        <p
          role="alert"
          className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {formError}
        </p>
      ) : null}

      <TextField
        id="nama"
        label="Nama lengkap"
        required
        placeholder="Nama sesuai KTP"
        autoComplete="name"
        error={errors.nama?.message}
        {...register("nama")}
      />

      <TextField
        id="whatsapp"
        label="Nomor WhatsApp"
        required
        type="tel"
        inputMode="tel"
        placeholder="0811-585-255"
        autoComplete="tel"
        hint="Nomor ini dipakai admin untuk konfirmasi jadwal pemasangan."
        error={errors.whatsapp?.message}
        {...register("whatsapp")}
      />

      <TextAreaField
        id="alamat"
        label="Alamat pemasangan"
        required
        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
        autoComplete="street-address"
        error={errors.alamat?.message}
        {...register("alamat")}
      />

      <SelectField
        id="paketId"
        label="Paket"
        required
        defaultValue={defaultPackageId}
        error={errors.paketId?.message}
        {...register("paketId")}
      >
        <option value="">Pilih paket</option>
        {packages.map((pkg) => (
          <option key={pkg.id} value={pkg.id}>
            {pkg.name} — {pkg.speedMbps} Mbps — Rp{pkg.pricePerMonth.toLocaleString("id-ID")}/bulan
          </option>
        ))}
      </SelectField>

      <TextField
        id="tanggalPasang"
        label="Rencana tanggal pasang"
        type="date"
        error={errors.tanggalPasang?.message}
        {...register("tanggalPasang")}
      />

      <TextAreaField
        id="catatan"
        label="Catatan"
        placeholder="Contoh: rumah pagar hijau, pemasangan setelah jam 15.00"
        error={errors.catatan?.message}
        {...register("catatan")}
      />

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Memproses..." : "Kirim ke WhatsApp"}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          Pendaftaran dikirim lewat WhatsApp ke admin SpaceNet. Data belum disimpan di database pada
          tahap ini.
        </p>
      </div>

      {status ? (
        <p role="status" className="text-sm text-muted">
          {status}
        </p>
      ) : null}
    </form>
  );
}
