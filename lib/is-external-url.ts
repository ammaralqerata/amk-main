export function isExternalUrl(href: string) {
  return /^(https?:)?\/\//.test(href);
}
