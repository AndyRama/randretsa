export type FaqItem = { question: string; answer: string };

// Safe fallback for legacy question-only consumers; not recovered source copy.
const legacyAnswer = "Pour préciser ce point selon votre projet, contactez Édouard à l'atelier. Une description et des photos permettent de commencer l'échange.";

export function Faq({ items }: { items: readonly (string | FaqItem)[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const { question, answer } = typeof item === "string" ? { question: item, answer: legacyAnswer } : item;
        return (
        <details key={question} className="group border-b border-line">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-serif text-[17px]">
            {question}
            <span aria-hidden className="text-body transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-[38rem] pb-5 text-[14px] leading-relaxed text-body">{answer}</p>
        </details>
        );
      })}
    </div>
  );
}
