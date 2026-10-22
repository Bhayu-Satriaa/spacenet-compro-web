/** Dipakai Header (client) dan Footer (server) — jangan taruh di file "use client". */
export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/tentang", label: "Tentang" },
  { href: "/layanan", label: "Layanan" },
  { href: "/paket", label: "Paket" },
  { href: "/jangkauan", label: "Jangkauan" },
  { href: "/bantuan", label: "Bantuan" },
  { href: "/kontak", label: "Kontak" },
];
