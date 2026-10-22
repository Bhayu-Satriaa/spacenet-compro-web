import type { CoverageArea } from "@/types";

/**
 * PERINGATAN: ini DATA CONTOH, bukan daftar area resmi SpaceNet.
 * Daftar kelurahan/kecamatan asli belum diberikan pemilik (brief bagian 10 poin 6).
 * UI wajib menampilkan penanda bahwa data ini contoh.
 */
export const COVERAGE_IS_SAMPLE = true;

export const coverageSampleNote =
  "Data area di halaman ini masih contoh dan belum diverifikasi. Konfirmasi ketersediaan jaringan lewat WhatsApp sebelum mendaftar.";

export const coverageAreas: CoverageArea[] = [
  { kecamatan: "Samarinda Ilir", kelurahan: "Sidomulyo", status: "aktif" },
  { kecamatan: "Samarinda Ilir", kelurahan: "Sidodadi", status: "aktif" },
  { kecamatan: "Samarinda Ilir", kelurahan: "Sungai Dama", status: "aktif" },
  { kecamatan: "Samarinda Ilir", kelurahan: "Karang Mumus", status: "perluasan" },
  { kecamatan: "Samarinda Ilir", kelurahan: "Pelita", status: "antrian" },
  { kecamatan: "Samarinda Ulu", kelurahan: "Jawa", status: "aktif" },
  { kecamatan: "Samarinda Ulu", kelurahan: "Bugis", status: "aktif" },
  { kecamatan: "Samarinda Ulu", kelurahan: "Air Putih", status: "perluasan" },
  { kecamatan: "Samarinda Kota", kelurahan: "Karang Anyar", status: "aktif" },
  { kecamatan: "Samarinda Kota", kelurahan: "Pasar Pagi", status: "perluasan" },
  { kecamatan: "Sungai Kunjang", kelurahan: "Karang Asam Ulu", status: "antrian" },
  { kecamatan: "Sambutan", kelurahan: "Sungai Kapih", status: "antrian" },
];
