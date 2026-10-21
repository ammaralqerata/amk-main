/**
 * Silent looping showreel behind the home page hero.
 *
 * To change it: export a 10–20 s clip (no audio), put it in public/showreel/,
 * and point `src` at it. `poster` is the still shown while the video loads
 * (and instead of the video for visitors who prefer reduced motion).
 * Set SHOWREEL to null to go back to the animated aurora background.
 */
export type Showreel = {
  src: string;
  poster: string;
};

export const SHOWREEL: Showreel | null = null;
