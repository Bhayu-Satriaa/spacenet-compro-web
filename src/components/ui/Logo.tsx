import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string | null;
};

/**
 * Placeholder logo: motif orbit + kata SPACE (ink) dan NET (biru), sesuai
 * deskripsi brief bagian 4. TODO: ganti dengan file logo resmi (SVG/PNG)
 * begitu pemilik mengirimkannya (brief bagian 10 poin 10).
 */
export function Logo({ className = "", href = "/" }: LogoProps) {
  const content = (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
        className="h-9 w-9 shrink-0"
      >
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <ellipse
          cx="20"
          cy="20"
          rx="18"
          ry="7"
          fill="none"
          stroke="var(--sky)"
          strokeWidth="1.5"
          transform="rotate(-28 20 20)"
          opacity="0.9"
        />
        <circle cx="20" cy="20" r="5.5" fill="var(--blue)" />
        <circle cx="35.2" cy="12.4" r="2.4" fill="var(--sky)" />
      </svg>
      <span className="font-heading text-xl font-extrabold italic tracking-tight">
        <span className="text-ink">SPACE</span>
        <span className="text-blue">NET</span>
      </span>
    </span>
  );

  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center rounded transition-opacity hover:opacity-80 ${className}`}
      aria-label="SpaceNet — kembali ke beranda"
    >
      {content}
    </Link>
  );
}
