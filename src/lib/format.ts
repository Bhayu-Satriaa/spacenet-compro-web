/** 170000 -> "Rp170.000" (tanpa spasi, sesuai brief). */
export function formatRupiah(value: number): string {
  const rounded = Math.round(Number.isFinite(value) ? value : 0);
  return `Rp${rounded.toLocaleString("id-ID")}`;
}

/** 50 -> "50 Mbps" */
export function formatSpeed(mbps: number): string {
  return `${mbps} Mbps`;
}

/** "2026-10-21" -> "21 Oktober 2026" (opsional, untuk tampilan). */
export function formatTanggalIndonesia(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
