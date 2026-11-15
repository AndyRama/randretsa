import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1072px] px-6 md:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[10px] font-medium uppercase tracking-[0.2em] text-moss ${className}`}>{children}</p>;
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`tracking-[0.08em] text-moss ${className}`}>
      ★★★★★
    </span>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M3.2 2h2.4l1.1 3-1.5 1a8 8 0 0 0 3.8 3.8l1-1.5 3 1.1v2.4a1.4 1.4 0 0 1-1.5 1.4A10.8 10.8 0 0 1 1.8 3.5 1.4 1.4 0 0 1 3.2 2Z" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M8 14.5s4.5-4.2 4.5-7.8a4.5 4.5 0 0 0-9 0c0 3.6 4.5 7.8 4.5 7.8Z" />
      <circle cx="8" cy="6.7" r="1.6" />
    </svg>
  );
}

const variants = {
  solid: "bg-dark text-white hover:bg-dark/85",
  outline: "border border-ink/20 text-ink hover:border-ink",
  white: "bg-white text-ink hover:bg-white/90",
  "outline-light": "border border-white/30 text-white hover:border-white",
  ghost: "border border-line bg-paper text-ink hover:border-ink/40",
} as const;

export function Button({
  href,
  variant = "solid",
  children,
  className = "",
  external = false,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 text-[13px] font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionTitle({ as: Tag = "h2", children, className = "" }: { as?: "h1" | "h2"; children: ReactNode; className?: string }) {
  const size = Tag === "h1" ? "text-[clamp(2.2rem,4.4vw,3.3rem)] leading-[1.1]" : "text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.15]";
  return <Tag className={`tracking-[-0.01em] ${size} ${className}`}>{children}</Tag>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[16px] leading-[1.7] text-body ${className}`}>{children}</p>;
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
      <ol className="flex items-center gap-2">
        <li><Link href="/" className="hover:text-ink">Accueil</Link></li>
        <li aria-hidden>/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function Photo({ src, alt, sizes, priority = false, className = "aspect-[4/3]" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

export function Check() {
  return <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="mt-1 shrink-0 text-body"><path d="m2.5 6.3 2.3 2.3 4.7-5" /></svg>;
}

export function Bullet() {
  return <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-body/60" />;
}
