import { company, socialLinks, trustPoints, valuePoints, whyPoints } from "@/data/company";
import { coverageAreas } from "@/data/coverage";
import { faqItems } from "@/data/faq";
import { packagesData, promoFeature } from "@/data/packages";
import { promo } from "@/data/promo";
import { buildRegistrationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type {
  Company,
  CoverageArea,
  CoverageResult,
  FaqItem,
  Package,
  PackageId,
  Promo,
  Registration,
  TrustPoint,
  ValuePoint,
} from "@/types";
import type { WhyPoint } from "@/data/company";

/**
 * Satu-satunya pintu data untuk komponen.
 * Semua fungsi async supaya nanti cukup diganti isi fungsinya menjadi
 * fetch()/query SQLite tanpa mengubah komponen pemanggil.
 */

function withPromoFeature(list: Package[]): Package[] {
  return list.map((pkg) => ({
    ...pkg,
    features: promo.active ? [...pkg.features, promoFeature] : pkg.features,
  }));
}

export async function getPackages(): Promise<Package[]> {
  return withPromoFeature(packagesData);
}

export async function getPackageById(id: PackageId): Promise<Package | null> {
  const found = packagesData.find((pkg) => pkg.id === id);
  if (!found) return null;
  return withPromoFeature([found])[0];
}

export async function getPopularPackage(): Promise<Package | null> {
  const found = packagesData.find((pkg) => pkg.highlight) ?? null;
  if (!found) return null;
  return withPromoFeature([found])[0];
}

export async function getPromo(): Promise<Promo> {
  return promo;
}

export async function getCompany(): Promise<Company> {
  return company;
}

export async function getSocialLinks(): Promise<{ label: string; href: string }[]> {
  return socialLinks;
}

/** Poin nilai jual; klaim gratis pemasangan diganti bila promo tidak aktif. */
export async function getValuePoints(): Promise<ValuePoint[]> {
  if (promo.active) return valuePoints;
  return valuePoints.map((point) =>
    point.id === "instalasi"
      ? {
          ...point,
          title: "Pemasangan mudah",
          description: "Pemasangan dijadwalkan bersama teknisi kami di area jangkauan.",
        }
      : point,
  );
}

export async function getWhyPoints(): Promise<WhyPoint[]> {
  return whyPoints;
}

export async function getTrustPoints(): Promise<TrustPoint[]> {
  return trustPoints;
}

export async function getCoverageAreas(): Promise<CoverageArea[]> {
  return coverageAreas;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return faqItems;
}

function normalizeAreaName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(kel|kelurahan|kec|kecamatan|kota|kabupaten)\.?\b/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const statusCopy: Record<CoverageArea["status"], { title: string; message: string }> = {
  aktif: {
    title: "Area Anda terjangkau",
    message:
      "Jaringan SpaceNet sudah tersedia di area ini. Anda bisa langsung mendaftar dan tim kami akan mengonfirmasi jadwal pemasangan.",
  },
  perluasan: {
    title: "Area Anda dalam perluasan jaringan",
    message:
      "Jaringan sedang diperluas ke area ini. Hubungi kami lewat WhatsApp untuk mengetahui perkiraan waktu ketersediaan.",
  },
  antrian: {
    title: "Area Anda belum tersedia",
    message:
      "Jaringan belum tersedia di area ini. Anda bisa masuk daftar antrean agar dihubungi saat jaringan tersedia.",
  },
};

export async function checkCoverage(kelurahan: string, kecamatan: string): Promise<CoverageResult> {
  const targetKelurahan = normalizeAreaName(kelurahan);
  const targetKecamatan = normalizeAreaName(kecamatan);

  const matched =
    coverageAreas.find(
      (area) =>
        normalizeAreaName(area.kelurahan) === targetKelurahan &&
        normalizeAreaName(area.kecamatan) === targetKecamatan,
    ) ??
    coverageAreas.find((area) => normalizeAreaName(area.kelurahan) === targetKelurahan) ??
    null;

  const status = matched?.status ?? "antrian";
  return { status, matchedArea: matched, ...statusCopy[status] };
}

/**
 * Titik sambung backend. Untuk tahap frontend, fungsi ini TIDAK menyimpan
 * apa pun ke database; ia hanya menyusun pesan WhatsApp.
 * Nanti: POST /api/registrations lalu tetap kembalikan URL WhatsApp.
 */
export async function submitRegistration(
  input: Registration,
  pkg: Package,
): Promise<{ whatsappUrl: string }> {
  const message = buildRegistrationMessage({
    nama: input.nama,
    whatsapp: input.whatsapp,
    alamat: input.alamat,
    paketNama: pkg.name,
    paketSpeed: pkg.speedMbps,
    paketHarga: pkg.pricePerMonth,
    tanggalPasang: input.tanggalPasang,
    catatan: input.catatan,
  });

  return { whatsappUrl: buildWhatsAppUrl({ text: message }) };
}
