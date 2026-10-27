export const WHATSAPP_NUMBER = "9647766870565";
export const EMAIL = "ammaralqerata@gmail.com";

/** wa.me link that opens a chat with the given text already typed in. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
