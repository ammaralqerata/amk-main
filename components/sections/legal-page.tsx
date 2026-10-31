import { PageHero } from "@/components/sections/page-hero";
import type { LegalDoc } from "@/content/legal";

const URL_SPLIT = /(https?:\/\/[^\s،]+)/;

// Turns bare URLs inside a paragraph into links (split with a capture group puts URLs at odd indexes).
function withLinks(text: string) {
  return text.split(URL_SPLIT).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" dir="ltr" className="inline-block max-w-full break-words text-accent-ink underline underline-offset-4">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} description={doc.intro} iconKind="overview" />
      <section className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-[760px] flex flex-col gap-10">
          <p className="text-muted text-sm">{doc.updated}</p>
          {doc.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-display text-2xl md:text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-lg leading-relaxed">
                  {withLinks(paragraph)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
