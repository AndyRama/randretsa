import { Stars } from "./ui";
import { reviews } from "@/lib/content";

export function ReviewCards({ items = reviews.slice(0, 3), cols = "md:grid-cols-3" }: { items?: typeof reviews; cols?: string }) {
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((r) => (
        <figure key={r.tag} className="flex flex-col border border-line bg-card p-5">
          <div className="flex items-center justify-between">
            <Stars className="text-[12px]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{r.tag}</span>
          </div>
          <blockquote className="mt-4 flex-1 font-serif text-[16px] leading-[1.6]">« {r.text} »</blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-sand text-[10px] font-medium text-body">G</span>
            <span className="text-[11px] leading-tight text-body">Avis Google vérifié<br />{r.date}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
