import { describe, it, expect } from "vitest";
import {
  FEATURED_VIDEO_IDS,
  getFeaturedVideos,
  getVideoTitle,
  getActiveCategories,
  getFilterCategories,
  COMING_SOON_CATEGORIES,
  VIDEO_CATEGORIES,
  VIDEOS,
} from "./videos";
import { routing } from "@/i18n/routing";

describe("videos", () => {
  it("has no duplicate YouTube ids", () => {
    const ids = VIDEOS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses well-formed YouTube ids", () => {
    for (const v of VIDEOS) {
      expect(v.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
    }
  });

  it("lists only the categories that have videos", () => {
    const active = getActiveCategories();
    expect(active.length).toBeGreaterThan(0);
    for (const category of VIDEO_CATEGORIES) {
      expect(active.includes(category)).toBe(VIDEOS.some((v) => v.category === category));
    }
  });

  it("keeps coming-soon categories in the filters even while empty", () => {
    const filters = getFilterCategories();
    for (const category of COMING_SOON_CATEGORIES) expect(filters).toContain(category);
    for (const category of getActiveCategories()) expect(filters).toContain(category);
  });

  it("has a non-empty title in every locale", () => {
    for (const v of VIDEOS) {
      for (const locale of routing.locales) {
        expect(getVideoTitle(v, locale).trim()).not.toBe("");
      }
    }
  });

  it("only features videos that exist", () => {
    expect(getFeaturedVideos().map((v) => v.id)).toEqual(FEATURED_VIDEO_IDS);
  });
});
