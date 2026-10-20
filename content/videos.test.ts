import { describe, it, expect } from "vitest";
import {
  FEATURED_VIDEO_IDS,
  getFeaturedVideos,
  getVideoTitle,
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

  it("has at least one video in every category", () => {
    for (const category of VIDEO_CATEGORIES) {
      expect(VIDEOS.some((v) => v.category === category)).toBe(true);
    }
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
