import Link from "next/link";

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-[13px] hover:text-moss">
      {children} <span aria-hidden className="text-[10px]">↗</span>
    </Link>
  );
}
