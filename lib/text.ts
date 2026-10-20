const NO_BREAK_SPACE = String.fromCharCode(160);

/** Keep multi-word Adobe product names on one line so they never split mid-name (matters most in Arabic text). */
export function keepProductNamesTogether(text: string): string {
  return text.replace(/\b(After|Premiere|Media) (Effects|Pro|Encoder)\b/g, `$1${NO_BREAK_SPACE}$2`);
}
