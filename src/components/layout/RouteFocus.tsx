"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Setelah pindah halaman, pindahkan fokus ke <main> supaya pengguna
 * pembaca layar langsung mendengar halaman baru (next/router tidak
 * mereset fokus secara otomatis).
 */
export function RouteFocus() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const main = document.getElementById("konten");
    main?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
