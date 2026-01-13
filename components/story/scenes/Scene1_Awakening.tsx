export default function Scene1_Awakening() {
  return (
    <section className="ff-scene scene--sweet relative flex flex-col items-center justify-center text-center">
      {/* Gradient base */}
      <div className="hero-bg absolute inset-0" />

      {/* Soft bloom that brightens from center */}
      <div className="hero-bloom pointer-events-none absolute inset-0" />

      {/* Tiny floating light particles (no SVG) */}
      <div className="hero-particles pointer-events-none absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`float-dot fd-${i + 1}`} />
        ))}
      </div>

      <div className="relative z-10 px-6">
        <img
          src="/brand/fruits-n-fluff-logo.png"
          alt="Fruits n Fluff"
          className="hero-logo mx-auto w-[46vw] max-w-[180px] sm:max-w-[220px] drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
        />

        <h1 className="hero-heading font-display text-[clamp(1.9rem,6.2vw,3.1rem)] font-semibold mt-5 text-violet leading-tight">
          Once upon a whisk
        </h1>

        <p className="hero-sub font-sans text-[clamp(1rem,3.6vw,1.2rem)] text-ink opacity-90 mt-2 max-w-[40ch] mx-auto">
          Organic cakes and gluten free desserts, freshly made in Lebanon.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {["Organic Cakes", "Gluten Free", "Fresh Fruit", "Made in Lebanon"].map((t) => (
            <span
              key={t}
              className="tag inline-flex items-center px-3 py-1 rounded-full text-[0.8rem] bg-white/70 border border-[rgba(75,63,114,0.18)] backdrop-blur-[6px] text-ink"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Optional micro line (hidden on mobile; keep if you added .ff-micro helper) */}
<p className="hero-micro ff-micro text-ink/80 text-[0.95rem] mt-3">
  Every story begins with simple ingredients: fruit, air, and a little imagination.
</p>
      </div>
    </section>
  );
}
