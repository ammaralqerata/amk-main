import { describe, it, expect } from "vitest";
import { getTool, TOOL_SLUGS, TOOLS } from "./index";
import { routing } from "@/i18n/routing";

describe("tools registry", () => {
  it("returns undefined for unknown slugs", () => {
    for (const locale of routing.locales) {
      expect(getTool("nonexistent", locale)).toBeUndefined();
    }
  });

  it("has one entry per declared slug in every locale", () => {
    for (const slug of TOOL_SLUGS) {
      for (const locale of routing.locales) {
        const tool = getTool(slug, locale);
        expect(tool).toBeDefined();
        expect(tool!.slug).toBe(slug);
      }
    }
  });

  it("every tool has non-empty required fields in every locale", () => {
    for (const slug of TOOL_SLUGS) {
      for (const locale of routing.locales) {
        const t = TOOLS[slug][locale];
        expect(t.name.length).toBeGreaterThan(0);
        expect(t.description.length).toBeGreaterThan(0);
        expect(t.platforms.length).toBeGreaterThan(0);
        expect(t.meta.title.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses the expected external download links for published plugins", () => {
    const expectedLinks = {
      captions: "/download/captions",
      itala: "/download/itala",
      consol: "/download/consol",
      graph: "/download/graph",
      "beat-marker": "/download/beat-marker",
      fadhakkir: "/download/fadhakkir",
    } as const;

    for (const locale of routing.locales) {
      for (const [slug, href] of Object.entries(expectedLinks)) {
        expect(getTool(slug, locale)?.cta.href).toBe(href);
      }
    }
  });

  it("always exposes plugin names in English", () => {
    const expectedNames = {
      captions: "AMK Captions",
      itala: "AMK Itala",
      consol: "AMK Consol",
      graph: "AMK Graph",
      "beat-marker": "AMK Beat Marker",
      fadhakkir: "Fadhakkir",
    } as const;

    for (const locale of routing.locales) {
      for (const [slug, name] of Object.entries(expectedNames)) {
        expect(getTool(slug, locale)?.name).toBe(name);
      }
    }
  });
});
