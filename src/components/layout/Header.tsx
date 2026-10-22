"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "text-blue" : "text-ink hover:text-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/daftar">Daftar</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded text-ink hover:text-blue lg:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} navItems={navItems} />
    </header>
  );
}
