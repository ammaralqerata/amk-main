"use client";
import { useEffect, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/social-icons";

/** Show the "back to top" button once the visitor is this far down the page. */
const TOP_BUTTON_AFTER_PX = 700;
/** The "talk to me" bubble pops once per visit, this long after landing… */
const BUBBLE_DELAY_MS = 9000;
/** …and tucks itself away again after this long. */
const BUBBLE_VISIBLE_MS = 7000;
const BUBBLE_SEEN_KEY = "amk-wa-bubble-seen";

/**
 * Fixed WhatsApp button (bottom-right) and back-to-top button (bottom-left).
 * Physical sides on purpose: the same corners in Arabic and English.
 */
export function FloatingActions() {
  const t = useTranslations("floating");
  const [showTop, setShowTop] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > TOP_BUTTON_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(BUBBLE_SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const show = window.setTimeout(() => {
      setBubble(true);
      try {
        sessionStorage.setItem(BUBBLE_SEEN_KEY, "1");
      } catch {}
    }, BUBBLE_DELAY_MS);
    const hide = window.setTimeout(() => setBubble(false), BUBBLE_DELAY_MS + BUBBLE_VISIBLE_MS);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 md:bottom-6 md:right-6" dir="ltr">
        <div
          role="status"
          className={cn(
            "glass relative flex items-center gap-2 rounded-2xl py-2.5 pe-2.5 ps-4 text-sm text-white shadow-xl shadow-black/40 transition-all duration-500",
            bubble ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0",
          )}
        >
          <a href={whatsappUrl(t("whatsappMessage"))} target="_blank" rel="noopener noreferrer" dir="auto" className="font-semibold">
            {t("bubble")}
          </a>
          <button
            type="button"
            onClick={() => setBubble(false)}
            aria-label={t("closeBubble")}
            className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden className="h-3.5 w-3.5" />
          </button>
        </div>
        <a
          href={whatsappUrl(t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          title={t("whatsapp")}
          onMouseEnter={() => setBubble(true)}
          onMouseLeave={() => setBubble(false)}
          className="wa-pulse relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 md:h-16 md:w-16"
        >
          <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
        </a>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("backToTop")}
        title={t("backToTop")}
        tabIndex={showTop ? 0 : -1}
        className={cn(
          "glass fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg shadow-black/40 transition-all duration-300 hover:text-accent md:bottom-6 md:left-6",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUp aria-hidden className="h-5 w-5" />
      </button>
    </>
  );
}
