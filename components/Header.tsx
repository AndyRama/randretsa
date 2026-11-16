"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { PhoneIcon } from "./ui";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] w-full max-w-[1072px] items-center justify-between gap-6 px-6 md:px-8">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {nav.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={`whitespace-nowrap border-b pb-0.5 text-[14px] transition-colors ${active ? "border-ink text-ink" : "border-transparent text-body hover:text-ink"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap border border-line px-4 py-2.5 text-[13px] hover:border-ink/40"><PhoneIcon className="text-body" /> {site.phone}</a>
          <Link href="/contact" className="whitespace-nowrap bg-dark px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-dark/85">Demander un devis</Link>
        </div>
        <button type="button" className="-mr-2 p-2 text-[13px] font-medium lg:hidden" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((v) => !v)}>
          {open ? "Fermer" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="max-h-[calc(100dvh-76px-80px-env(safe-area-inset-bottom))] overflow-y-auto border-t border-line bg-paper px-6 pb-8 pt-2 lg:hidden">
          <ul className="divide-y divide-line">
            {nav.map((l) => (<li key={l.href}><Link href={l.href} className="block py-4 font-serif text-xl">{l.label}</Link></li>))}
          </ul>

        </nav>
      )}
    </header>
    <nav aria-label="Actions rapides" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t border-line bg-paper px-4 pt-4 pb-[calc(15px+env(safe-area-inset-bottom))] lg:hidden">
      <Link href="/contact" className="inline-flex min-h-12 min-w-0 items-center justify-center bg-dark px-3 text-[13px] font-medium text-white transition-colors hover:bg-dark/85">Devis</Link>
      <a href={site.phoneHref} className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 border border-line px-3 text-[13px] font-medium hover:border-ink/40"><PhoneIcon /> Téléphone</a>
    </nav>
    </>
  );
}
