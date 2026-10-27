"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { ImagePlus, Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";
import { keepProductNamesTogether } from "@/lib/text";
import { WhatsAppIcon } from "@/components/ui/social-icons";

const APPS = ["afterEffects", "premiere", "both"] as const;
type App = (typeof APPS)[number];

const field =
  "w-full rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-accent";

/**
 * "Need a custom plugin?" card with a short form. Nothing is stored or sent from the
 * site: the answers are written into a WhatsApp chat or an email for the visitor to send.
 * Neither can carry attachments from a link, so screenshots are added in the chat itself.
 */
export function PluginRequest() {
  const t = useTranslations("pluginRequest");
  const id = useId();
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState("");
  const [app, setApp] = useState<App>("afterEffects");
  const [idea, setIdea] = useState("");
  const [missingIdea, setMissingIdea] = useState(false);

  function message() {
    return [
      t("message.greeting"),
      name.trim() ? `${t("message.name")}: ${name.trim()}` : null,
      `${t("message.app")}: ${t(`apps.${app}`)}`,
      `${t("message.idea")}: ${idea.trim()}`,
      "",
      t("message.screenshots"),
    ]
      .filter((line) => line !== null)
      .join("\n");
  }

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!idea.trim()) {
      setMissingIdea(true);
      ideaRef.current?.focus();
      return;
    }
    const via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
    const url = via === "email" ? mailtoUrl(t("message.subject"), message()) : whatsappUrl(message());
    window.open(url, via === "email" ? "_self" : "_blank", "noopener,noreferrer");
  }

  return (
    <div className="spotlight relative grid h-full gap-8 overflow-hidden rounded-3xl border border-accent/25 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-accent)_14%,transparent),color-mix(in_srgb,var(--color-accent)_2%,transparent)_55%)] p-6 md:p-9 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-fg">
          <Sparkles aria-hidden className="h-6 w-6" />
        </span>
        <h3 className="font-display text-2xl uppercase md:text-3xl">{t("title")}</h3>
        <p className="text-sm leading-relaxed text-white/65 md:text-base">{keepProductNamesTogether(t("body"))}</p>
        <p className="mt-auto flex items-start gap-2 text-xs leading-relaxed text-white/50 md:text-sm">
          <ImagePlus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {t("screenshotsHint")}
        </p>
      </div>

      <form onSubmit={send} noValidate className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-white/70">
          {t("nameLabel")}
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder={t("namePlaceholder")} className={field} />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm text-white/70">{t("appLabel")}</legend>
          <div className="flex flex-wrap gap-2">
            {APPS.map((a) => (
              <label
                key={a}
                className={cn(
                  "flex min-h-[44px] flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border px-3 text-center text-[13px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                  app === a ? "border-accent bg-accent/15 text-white" : "border-white/12 text-white/65 hover:border-white/30",
                )}
              >
                <input type="radio" name={`${id}-app`} value={a} checked={app === a} onChange={() => setApp(a)} className="sr-only" />
                <span dir="ltr">{t(`apps.${a}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2 text-sm text-white/70">
          {t("ideaLabel")}
          <textarea
            ref={ideaRef}
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              if (e.target.value.trim()) setMissingIdea(false);
            }}
            rows={4}
            required
            aria-invalid={missingIdea}
            aria-describedby={missingIdea ? `${id}-idea-error` : undefined}
            placeholder={t("ideaPlaceholder")}
            className={cn(field, "resize-y", missingIdea && "border-red-400/70")}
          />
          {missingIdea ? (
            <span id={`${id}-idea-error`} className="text-xs text-red-300">{t("ideaMissing")}</span>
          ) : null}
        </label>

        <div className="mt-1 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <button
            type="submit"
            value="whatsapp"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 font-semibold text-accent-fg transition-shadow hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t("sendWhatsapp")}
          </button>
          <button
            type="submit"
            value="email"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white/[0.06]"
          >
            <Mail aria-hidden className="h-5 w-5" />
            {t("sendEmail")}
          </button>
        </div>
      </form>
    </div>
  );
}
