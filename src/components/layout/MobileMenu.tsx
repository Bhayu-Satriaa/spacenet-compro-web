"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

type NavItem = { href: string; label: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // Trap fokus: Tab dari elemen terakhir kembali ke awal, Shift+Tab sebaliknya.
      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-bg p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded text-ink hover:text-blue"
            aria-label="Tutup menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navigasi utama (seluler)" className="mt-6 flex-1 overflow-y-auto">
          <ul className="flex flex-col divide-y divide-line">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3.5 text-base font-medium text-ink hover:text-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-4 border-t border-line pt-4">
          <ButtonLink href="/daftar" size="lg" fullWidth onClick={onClose}>
            Daftar berlangganan
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-muted">
            Butuh bantuan cepat? Hubungi 0811-585-255
          </p>
        </div>
      </div>
    </div>
  );
}
