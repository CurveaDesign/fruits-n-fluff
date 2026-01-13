export default function Scene3_WhippedAir() {
  return (
    <section className="ff-scene relative text-center">
      {/* Parallax image that will slide up over Scene 2 and keep moving into Scene 4 */}
      <div
        className="creation-img absolute inset-0 bg-center bg-cover will-change-transform"
        style={{ backgroundImage: "url(/story/scene3-fruits.jpg)" }}
      />

      {/* Readability scrim (subtle, animated in) */}
      <div className="creation-scrim absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="content-glass mx-auto max-w-[720px]">
          <h1 className="creation-heading font-display text-[clamp(1.6rem,6vw,2.6rem)] font-semibold text-white leading-tight dropcopy">
            Light as air, rich in flavor
          </h1>
          <p className="creation-sub font-sans text-[clamp(1rem,3.5vw,1.12rem)] text-white/95 mt-2 max-w-[46ch] mx-auto dropcopy">
            Our fruity cakes are as gentle as a summer breeze.
          </p>
          {/* optional micro line (only sm+ if you use ff-micro) */}
          <p className="creation-micro ff-micro text-white/90 text-[0.95rem] mt-2 max-w-[46ch] mx-auto dropcopy">
            Strawberry, lemon, mango: each one is a cloud of taste, naturally sweet and gluten free.
          </p>
        </div>
      </div>
    </section>
  );
}
