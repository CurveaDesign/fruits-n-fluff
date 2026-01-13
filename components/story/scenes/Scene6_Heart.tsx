import type { CSSProperties, JSX } from "react";

type HeartBgVars = CSSProperties & {
  ["--c1"]?: string;
  ["--c2"]?: string;
  ["--c3"]?: string;
};

export default function Scene6_Heart(): JSX.Element {
  const bgVars: HeartBgVars = {
    "--c1": "#E7E1D6",
    "--c2": "#D9D3C6",
    "--c3": "#CBC4B6",
    background:
      "radial-gradient(130% 140% at 50% 85%, var(--c1) 0%, var(--c2) 55%, var(--c3) 100%)",
  };

  return (
    <section className="ff-scene relative text-center">
      {/* Neutral gradient + vignette */}
      <div className="heart-bg absolute inset-0" style={bgVars} />
      <div className="heart-vignette absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="heart-wrap mx-auto w-full max-w-[920px]">
          <p className="heart-eyebrow">Our philosophy</p>

          <div className="title-stack relative">
            <div className="title-glow" aria-hidden="true" />
            <h2 className="heart-title font-display text-[clamp(1.45rem,5.6vw,2.25rem)]">
              Made with heart since day one
            </h2>
            <span className="heart-divider" aria-hidden="true" />
          </div>

          <div className="pullq mx-auto">
            <span className="pullq-quote pullq-open" aria-hidden="true">
              “
            </span>

            <blockquote className="pullq-body">
              <p className="pullq-line">We don’t follow trends; we follow taste.</p>
              <p className="pullq-line">
                Real fruit, mindful recipes, and the patience to make every bite feel earned.
              </p>
            </blockquote>

            <span className="pullq-quote pullq-close" aria-hidden="true">
              ”
            </span>
          </div>

          <div className="heart-sign">
            <span className="sign-divider" aria-hidden="true" />
            <span className="sign-name italic">Fruits n Fluff</span>
          </div>

          <div className="heart-badges">
            <span className="heart-badge">Patience</span>
            <span className="heart-badge">Craft</span>
            <span className="heart-badge">Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}
