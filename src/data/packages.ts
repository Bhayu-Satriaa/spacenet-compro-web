import type { Package } from "@/types";

/**
 * Sumber: brosur "Spesial Promo Akhir Tahun" (brief bagian 5).
 * Jangan menambah PPN, masa kontrak, atau upload speed: tidak ada di brosur.
 */
/** Poin yang selalu berlaku (brosur). */
const brochureFeatures = [
  "Internet cepat dan stabil",
  "Harga murah dan terjangkau",
  "Tanpa batas FUP",
  "Pemasangan mudah",
  "Terjangkau di wilayah Anda",
];

/** Poin promosi: hanya ditampilkan selama promo.active bernilai true. */
export const promoFeature = "Gratis pemasangan (promo akhir tahun)";

export const packagesData: Package[] = [
  {
    id: "hemat",
    name: "Paket Hemat",
    speedMbps: 30,
    pricePerMonth: 170000,
    features: brochureFeatures,
  },
  {
    id: "mantap",
    name: "Paket Mantap",
    speedMbps: 50,
    pricePerMonth: 220000,
    highlight: true,
    features: brochureFeatures,
  },
  {
    id: "ideal",
    name: "Paket Ideal",
    speedMbps: 75,
    pricePerMonth: 270000,
    features: brochureFeatures,
  },
  {
    id: "gamers",
    name: "Spesial Gamers",
    speedMbps: 100,
    pricePerMonth: 340000,
    badge: "Spesial Gamers",
    features: brochureFeatures,
  },
];

export const popularPackageId = "mantap";
