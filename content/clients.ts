import type { Locale } from "@/i18n/routing";

/**
 * Businesses I've made videos for, shown as a scrolling strip on the home page.
 * Names for now; a client with a `logo` (path under /public) shows the logo instead.
 */
export type Client = { name: string | Record<Locale, string>; logo?: string };

export const CLIENTS: Client[] = [
  { name: "Top Car" },
  { name: "Pinky Glow" },
  { name: "المطبخ الملكي" },
  { name: "Hotel Dream Erbil" },
  { name: "محجوز" },
  { name: "ECN" },
  { name: "Premium Target" },
  { name: "فندق فلاش لايت" },
  { name: "KSG" },
  { name: "Acnoria Care" },
];

export function getClientName(client: Client, locale: Locale): string {
  return typeof client.name === "string" ? client.name : client.name[locale];
}
