import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import {
  FEATURED_VIDEO_IDS,
  getFeaturedVideos,
  getVideoTitle,
  getActiveCategories,
  getFilters,
  getVideosFor,
  isOnYoutube,
  isVertical,
  PINNED_FIRST,
  PINNED_FIRST_IN,
  COMING_SOON_CATEGORIES,
  VIDEO_CATEGORIES,
  VIDEOS,
  HIDDEN_TABS,
} from "./videos";
import { routing } from "@/i18n/routing";

describe("videos", () => {
  it("has no duplicate ids", () => {
    const ids = VIDEOS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses well-formed YouTube ids", () => {
    for (const v of VIDEOS.filter(isOnYoutube)) {
      expect(v.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
    }
  });

  it("uses well-formed ids for the unlisted YouTube copies", () => {
    for (const v of VIDEOS) for (const id of [v.yt, v.final?.yt]) if (id) expect(id).toMatch(/^[A-Za-z0-9_-]{11}$/);
  });

  it("gives site-only videos a poster, and every local file exists", () => {
    for (const v of VIDEOS) {
      if (!isOnYoutube(v)) {
        expect(v.poster, v.id).toBeTruthy();
        expect(Boolean(v.file || v.yt || v.compare), `${v.id} has nothing to play`).toBe(true);
      }
      for (const file of [v.poster, v.preview, v.file, v.compare?.before, v.compare?.after, v.final?.file, v.final?.preview, v.final?.poster]) {
        if (file?.startsWith("/")) expect(existsSync(join("public", file)), file).toBe(true);
      }
    }
  });

  it("lists only the categories that have videos", () => {
    const active = getActiveCategories();
    expect(active.length).toBeGreaterThan(0);
    for (const category of VIDEO_CATEGORIES) {
      expect(active.includes(category)).toBe(getVideosFor(category).length > 0);
    }
  });

  it("keeps coming-soon categories in the tabs even while empty, and ends with reels", () => {
    const filters = getFilters();
    expect(filters[0]).toBe("all");
    for (const category of COMING_SOON_CATEGORIES) expect(filters).toContain(category);
    for (const category of getActiveCategories()) {
      if (HIDDEN_TABS.includes(category)) expect(filters).not.toContain(category);
      else expect(filters).toContain(category);
    }
    expect(filters.at(-1)).toBe("reels");
  });

  it("puts every vertical video, and only those, under reels", () => {
    const ids = (list: { id: string }[]) => list.map((v) => v.id).sort();
    expect(ids(getVideosFor("reels"))).toEqual(ids(VIDEOS.filter(isVertical)));
  });

  it("has a non-empty title in every locale", () => {
    for (const v of VIDEOS) {
      for (const locale of routing.locales) {
        expect(getVideoTitle(v, locale).trim()).not.toBe("");
      }
    }
  });

  it("puts the pinned videos first, in order, wherever they appear", () => {
    const head = (filter: Parameters<typeof getVideosFor>[0], n: number) => getVideosFor(filter).slice(0, n).map((v) => v.id);
    expect(head("all", 3)).toEqual(PINNED_FIRST);
    expect(head("reels", 3)).toEqual(PINNED_FIRST);
    expect(head("beforeAfter", 3)).toEqual(PINNED_FIRST);
    expect(head("realEstate", 1)).toEqual(PINNED_FIRST_IN.realEstate);
    for (const id of [...PINNED_FIRST, ...(PINNED_FIRST_IN.realEstate ?? [])]) {
      expect(VIDEOS.some((v) => v.id === id), id).toBe(true);
    }
  });

  it("only features videos that exist", () => {
    expect(getFeaturedVideos().map((v) => v.id)).toEqual(FEATURED_VIDEO_IDS);
  });

  it("keeps motion graphics out of the ads tab", () => {
    expect(getVideosFor("ads").filter((v) => v.category === "motion")).toEqual([]);
  });

  it("shows the clean final everywhere but the before/after tab", () => {
    for (const v of VIDEOS.filter((x) => x.final)) {
      const play = (x?: { file?: string; yt?: string }) => x?.yt ?? x?.file;
      expect(play(getVideosFor("beforeAfter").find((x) => x.id === v.id))).not.toBe(play(v.final));
      expect(play(getVideosFor("reels").find((x) => x.id === v.id))).toBe(play(v.final));
    }
  });
});
