import type { CSSProperties, JSX } from "react";

type SplitBgVars = CSSProperties & {
  ["--c1"]?: string;
  ["--c2"]?: string;
  ["--c3"]?: string;
  ["--ink"]?: string;
  ["--panel"]?: string;
};

export default function Scene4_SplitWorld(): JSX.Element {
  const bgVars: SplitBgVars = {
    "--c1": "#4B3F72",
    "--c2": "#9E8CFF",
    "--c3": "#E4E6FF",
    "--ink": "#F8F9FF",
    "--panel": "rgba(255,255,255,0.82)",
    background:
      "radial-gradient(120% 120% at 50% 85%, var(--c1) 0%, var(--c2) 55%, var(--c3) 100%)",
    backgroundPosition: "50% 85%",
    filter: "hue-rotate(0deg)",
  };

  return (
    <section className="ff-scene relative text-center">
      {/* Always-visible gradient */}
      <div className="split-bg absolute inset-0" style={bgVars} />

      {/* Sweet bubbles */}
      <div className="sweet-bubbles pointer-events-none absolute inset-0">
        <span className="sb sb-1" />
        <span className="sb sb-2" />
        <span className="sb sb-3" />
      </div>

      {/* Savory spice specks */}
      <div className="spice-specks pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`speck sp-${i + 1}`} />
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="split-card mx-auto max-w-[760px]">
          <h1
            className="split-heading font-display text-[clamp(1.6rem,6vw,2.6rem)] leading-tight"
            data-text="From sweet delight to savory art"
          >
            From sweet delight to savory art
          </h1>

          <span className="headline-underline" aria-hidden="true" />

          <p className="split-sub font-sans text-[clamp(1rem,3.5vw,1.12rem)] mt-3 max-w-[52ch] mx-auto">
            Fruits n Fluff now caters beyond cakes. Homemade dishes for every table.
          </p>

          <p className="ff-micro split-micro text-[0.95rem] mt-2 max-w-[48ch] mx-auto">
            Where blueberries once danced, now spices simmer. Our story expands, not ends.
          </p>
        </div>
      </div>
    </section>
  );
}
