import type { CSSProperties, JSX } from "react";

type CatBgVars = CSSProperties & {
  ["--c1"]?: string;
  ["--c2"]?: string;
  ["--c3"]?: string;
  ["--ink"]?: string;
};

export default function Scene5_Catering(): JSX.Element {
  const bgVars: CatBgVars = {
    "--c1": "#E8E1D2",
    "--c2": "#D8D1C2",
    "--c3": "#C9C1B2",
    "--ink": "#2C2B29",
    background:
      "radial-gradient(120% 120% at 50% 85%, var(--c1) 0%, var(--c2) 55%, var(--c3) 100%)",
  };

  return (
    <section className="ff-scene relative text-center">
      {/* Always-on neutral gradient (no white flash) */}
      <div className="cat-bg absolute inset-0" style={bgVars} />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="cat-wrap mx-auto w-full max-w-[1000px]">
          {/* Eyebrow + Heading */}
          <p className="cat-eyebrow">Catering &amp; Plat du Jour</p>

          <h2
            className="cat-title font-display leading-tight text-[clamp(1.45rem,5.8vw,2.35rem)]"
            data-text="Served with love, shared with many"
          >
            Served with love, shared with many
          </h2>

          {/* Animated divider */}
          <span className="cat-divider" aria-hidden="true" />

          {/* Subcopy */}
          <p className="cat-sub font-sans text-[clamp(1rem,3.5vw,1.06rem)] max-w-[68ch] mx-auto">
            Plat du jour and catering menus prepared fresh each day — for family tables, offices, and private events.
          </p>

          {/* Feature grid */}
          <div className="cat-grid">
            <article className="cat-card">
              <div className="cat-card-head">
                <span className="cat-dot" />
                <h3 className="cat-card-title">Plat du jour</h3>
              </div>
              <p className="cat-card-copy">
                Daily rotating recipes, balanced and seasonal. Order by portion or family tray.
              </p>
              <ul className="cat-bullets">
                <li>Ready at lunchtime</li>
                <li>Vegetarian options available</li>
                <li>Pickup or delivery</li>
              </ul>
            </article>

            <article className="cat-card">
              <div className="cat-card-head">
                <span className="cat-dot" />
                <h3 className="cat-card-title">Catering trays</h3>
              </div>
              <p className="cat-card-copy">
                Beautifully assembled hot and cold trays for teams, family, and small gatherings.
              </p>
              <ul className="cat-bullets">
                <li>From 6 to 24 servings</li>
                <li>Menu curation support</li>
                <li>Easy reheating guides</li>
              </ul>
            </article>

            <article className="cat-card">
              <div className="cat-card-head">
                <span className="cat-dot" />
                <h3 className="cat-card-title">Private events</h3>
              </div>
              <p className="cat-card-copy">
                Thoughtful menus for milestones and intimate events, matched to your taste and budget.
              </p>
              <ul className="cat-bullets">
                <li>Tasting &amp; revisions</li>
                <li>On-site or delivered</li>
                <li>Dietary guidance</li>
              </ul>
            </article>
          </div>

          {/* Subtle policy strip */}
          <div className="cat-policy">
            <span className="cat-badge">Fresh daily</span>
            <span className="cat-badge">Chef-crafted</span>
            <span className="cat-badge">Family-size options</span>
          </div>
        </div>
      </div>
    </section>
  );
}
