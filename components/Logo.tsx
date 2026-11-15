import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Randretsa, menuiserie ébénisterie — accueil" className="flex items-center gap-3">
      <span className="flex h-[38px] w-[38px] items-center justify-center border border-line bg-paper text-body">
        <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 4h10M3 12h10M4 4c0 3 8 5 8 8M12 4c0 3-8 5-8 8" /></svg>
      </span>
      <span>
        <span className="block font-serif text-[16px] font-semibold leading-tight">Randretsa</span>
        <span className="block text-[8px] font-medium uppercase tracking-[0.2em] text-body">Menuiserie · Ébénisterie</span>
      </span>
    </Link>
  );
}
