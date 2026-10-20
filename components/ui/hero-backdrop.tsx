/** Decorative background for dark hero sections: drifting aurora + fading grid. */
export function HeroBackdrop({ grid = true }: { grid?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora" />
      {grid ? <div className="grid-fade" /> : null}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-inverse" />
    </div>
  );
}
