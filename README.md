# AMK Creative — ammar.kerata.net

Personal site of Ammar Kerata: video editing, motion graphics and Adobe plugins.
Arabic is the default language (`/`), English lives under `/en`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Before publishing, check everything still builds:

```bash
npm run lint && npm test && npm run build
```

## Where things live

| What | File |
| --- | --- |
| Portfolio videos (add / remove / reorder) | `content/videos.ts` |
| Videos featured on the home page | `FEATURED_VIDEO_IDS` in `content/videos.ts` |
| Plugin pages (text, features) | `content/tools/<plugin>.ts` |
| Plugin download links, screenshots, promo videos | `content/tools/index.ts` |
| All other page text (Arabic / English) | `messages/ar.json`, `messages/en.json` |

### Adding a new video

Copy the id from the YouTube link (the part after `watch?v=` or `shorts/`) and add a line to
`VIDEOS` in `content/videos.ts`, for example:

```ts
{ id: "dQw4w9WgXcQ", category: "ads", title: "اسم الفيديو" },
```

Categories: `ads`, `documentary`, `creative`, `shorts` (shorts are shown vertically).
