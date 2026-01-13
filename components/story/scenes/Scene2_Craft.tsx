export default function Scene2_Craft() {
  return (
    <section className="ff-scene relative text-left">
      {/* Background layers */}
      <div className="craft-bg absolute inset-0" />
      <div className="craft-grid pointer-events-none absolute inset-0" />
      <div className="craft-spot pointer-events-none absolute inset-0" />
      <div className="work-noise pointer-events-none absolute inset-0" />

      {/* Split layout */}
      <div className="relative z-10 h-full w-full flex items-center text-center sm:text-left">
        <div className="container mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left column */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="atelier-pill">
              <span className="dot" />
              <span className="label">ATELIER</span>
            </div>

            <h1 className="craft-heading font-display text-[clamp(1.6rem,6.2vw,3rem)] font-semibold text-violet leading-[1.05] mt-2">
              Every swirl
              <br />begins by hand
            </h1>

            <span className="headline-rule"/>

            <p className="craft-sub mt-2 text-[clamp(1rem,3.5vw,1.12rem)] text-ink/90 max-w-[40ch]">
              Real fruit, real ingredients, and time. Nothing mixed from a box.
            </p>
          </div>

          {/* Right column */}
          <div className="md:col-span-7">
            <div className="bench-panel rounded-2xl border backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div className="beam hidden sm:block" />
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 items-stretch">
                {[
                  { n: "01", t: "Hand whipped textures" },
                  { n: "02", t: "Natural colors from fruit" },
                  { n: "03", t: "Balanced sweetness" },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="bench-step flex items-center gap-3 rounded-xl border bg-white/85 backdrop-blur px-3 py-3 sm:px-4 sm:py-4"
                  >
                    <span className="bench-badge">{s.n}</span>
                    <span className="bench-text text-ink text-[0.95rem] sm:text-[1rem]">
                      {s.t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
