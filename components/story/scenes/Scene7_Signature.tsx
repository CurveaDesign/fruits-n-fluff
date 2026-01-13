import type { CSSProperties, JSX } from "react";

type SigBgVars = CSSProperties & {
  ["--c1"]?: string;
  ["--c2"]?: string;
  ["--c3"]?: string;
};

export default function Scene7_Signature(): JSX.Element {
  const bgVars: SigBgVars = {
    "--c1": "#E7E1D6",
    "--c2": "#D8D3EA",
    "--c3": "#4B3F72",
    background: "linear-gradient(140deg, var(--c1) 0%, var(--c2) 45%, var(--c3) 100%)",
  };

  return (
    <section className="ff-scene relative text-center">
      <div className="sig-bg absolute inset-0" style={bgVars} />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="sig-wrap mx-auto max-w-[940px]">
          <img
            src="/brand/fruits-n-fluff-logo.png"
            alt="Fruits n Fluff"
            className="sig-logo mx-auto"
            width={120}
            height={120}
            loading="eager"
            draggable={false}
          />

          <h2 className="sig-title font-display text-[clamp(1.6rem,5.2vw,2.7rem)]">
            The Fruits n Fluff Experience
          </h2>

          <p className="sig-sub text-[clamp(1rem,3.4vw,1.15rem)] mt-2">
            Discover our cakes and daily dishes below.
          </p>

          <div className="sig-ctas mt-6 flex flex-wrap justify-center gap-4">
            <a href="/menu/cakes" className="sig-btn">
              Cakes Menu
            </a>
            <a href="/menu/catering" className="sig-btn-outline">
              Catering Menu
            </a>
          </div>

          <div className="sig-credit">
            <span className="credit-line" aria-hidden="true" />
            <p className="credit-text">
              Designed by{" "}
              <a
                href="https://curveadesign.com"
                target="_blank"
                rel="noopener"
                className="curvea-link"
              >
                <span className="curvea-word">Curvea Design</span>
                <span className="curvea-shine" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
