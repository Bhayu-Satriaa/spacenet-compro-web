import type { FaqItem } from "@/types";

export const TODO_ANSWER = "TODO: konfirmasi dari klien.";

/**
 * Pertanyaan yang jawabannya belum ada di brief/situs lama ditandai isPlaceholder
 * supaya jelas ini belum final, bukan dikarang.
 */
export const faqItems: FaqItem[] = [
  {
    id: "cara-berlangganan",
    question: "Bagaimana cara berlangganan SpaceNet?",
    answer:
      "Isi formulir pendaftaran di halaman Daftar atau hubungi WhatsApp kami. Setelah data diterima, tim kami menghubungi Anda untuk konfirmasi jadwal pemasangan.",
  },
  {
    id: "biaya-pemasangan",
    question: "Apakah ada biaya pemasangan?",
    answer:
      "Pada periode Spesial Promo Akhir Tahun, pemasangan gratis. Setelah promo berakhir, biaya pemasangan belum ditetapkan.",
  },
  {
    id: "ppn",
    question: "Apakah harga paket sudah termasuk PPN?",
    answer: TODO_ANSWER,
    isPlaceholder: true,
  },
  {
    id: "kontrak",
    question: "Apakah ada kontrak minimum berlangganan?",
    answer: TODO_ANSWER,
    isPlaceholder: true,
  },
  {
    id: "upload",
    question: "Berapa kecepatan upload tiap paket?",
    answer: TODO_ANSWER,
    isPlaceholder: true,
  },
  {
    id: "pembayaran",
    question: "Bagaimana cara pembayaran tagihan?",
    answer:
      "Pembayaran dilakukan setiap bulan. Notifikasi tagihan, konfirmasi pembayaran, dan informasi gangguan dikirim melalui WhatsApp.",
  },
  {
    id: "gangguan",
    question: "Ke mana saya melapor jika internet gangguan?",
    answer:
      "Hubungi WhatsApp 0811-585-255. Support darurat tersedia 24 jam setiap hari. Tim teknisi menindaklanjuti laporan di area jangkauan.",
  },
  {
    id: "jangkauan",
    question: "Bagaimana cara tahu apakah area saya sudah terjangkau?",
    answer:
      "Gunakan halaman Cek Jangkauan. Jika area Anda belum tersedia, Anda bisa masuk daftar antrean melalui WhatsApp.",
  },
];
