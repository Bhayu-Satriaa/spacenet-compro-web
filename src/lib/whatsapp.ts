import { company } from "@/data/company";
import { formatRupiah } from "@/lib/format";
import type { Package } from "@/types";

/**
 * Buang karakter kontrol, ratakan baris baru menjadi spasi, dan rapikan spasi.
 * Dipakai sebelum input pengguna masuk ke pesan WhatsApp.
 */
export function sanitizeForMessage(value: string, maxLength = 300): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

type WhatsAppUrlInput = {
  text: string;
  phone?: string;
};

/** URL wa.me dengan teks ter-encode. Nomor default memakai data perusahaan. */
export function buildWhatsAppUrl({ text, phone = company.whatsapp }: WhatsAppUrlInput): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** "Halo SpaceNet, saya mau berlangganan paket Paket Mantap 50 Mbps." */
export function buildSubscribeMessage(pkg: Pick<Package, "name" | "speedMbps">): string {
  return `Halo SpaceNet, saya mau berlangganan paket ${pkg.name} ${pkg.speedMbps} Mbps.`;
}

export function buildSubscribeUrl(pkg: Pick<Package, "name" | "speedMbps">): string {
  return buildWhatsAppUrl({ text: buildSubscribeMessage(pkg) });
}

export type RegistrationMessageInput = {
  nama: string;
  whatsapp: string;
  alamat: string;
  paketNama: string;
  paketSpeed: number;
  paketHarga: number;
  tanggalPasang?: string;
  catatan?: string;
};

export function buildRegistrationMessage(input: RegistrationMessageInput): string {
  const lines = [
    "Halo SpaceNet, saya mau mendaftar berlangganan.",
    "",
    `Nama: ${sanitizeForMessage(input.nama, 80)}`,
    `WhatsApp: ${sanitizeForMessage(input.whatsapp, 20)}`,
    `Alamat pemasangan: ${sanitizeForMessage(input.alamat, 240)}`,
    `Paket: ${input.paketNama} ${input.paketSpeed} Mbps (${formatRupiah(input.paketHarga)}/bulan)`,
  ];

  const tanggal = input.tanggalPasang ? sanitizeForMessage(input.tanggalPasang, 20) : "";
  if (tanggal) lines.push(`Rencana tanggal pasang: ${tanggal}`);

  const catatan = input.catatan ? sanitizeForMessage(input.catatan, 240) : "";
  if (catatan) lines.push(`Catatan: ${catatan}`);

  lines.push("", "Mohon informasi ketersediaan jaringan di alamat saya. Terima kasih.");
  return lines.join("\n");
}

export function buildCoverageMessage(kelurahan: string, kecamatan: string): string {
  const k = sanitizeForMessage(kelurahan, 80);
  const c = sanitizeForMessage(kecamatan, 80);
  return `Halo SpaceNet, saya mau tanya ketersediaan jaringan di Kel. ${k}, Kec. ${c}. Mohon informasi apakah sudah terjangkau. Terima kasih.`;
}

export function buildQueueMessage(kelurahan: string, kecamatan: string): string {
  const k = sanitizeForMessage(kelurahan, 80);
  const c = sanitizeForMessage(kecamatan, 80);
  return `Halo SpaceNet, area saya (Kel. ${k}, Kec. ${c}) belum tersedia. Saya mau masuk daftar antrean pemasangan.`;
}
