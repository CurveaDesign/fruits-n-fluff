export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[color:rgba(59,92,210,0.18)] bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4 items-center justify-between text-sm text-black/70 md:flex-row">
          {/* Left: copyright */}
          <p className="order-2 md:order-1">
            © {year} Fruits n Fluff. All rights reserved.
          </p>

          {/* Center: single links page */}
          <a
            href="https://curveapages.com/fruits-n-fluff"
            target="_blank"
            rel="noopener"
            className="order-3 md:order-2 inline-flex items-center rounded-full border border-[rgba(59,92,210,0.25)] bg-white px-4 py-2 font-medium text-[color:var(--blueberry,#3b5cd2)] hover:bg-[rgba(59,92,210,0.06)] transition"
            aria-label="Open Fruits n Fluff links page"
          >
            Connect With Us
          </a>

          {/* Right: strong Curvea credit */}
          <a
            href="https://curveadesign.com"
            target="_blank"
            rel="noopener"
            className="order-1 md:order-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--blueberry,#3b5cd2)] px-4 py-2 text-white font-semibold shadow-[0_6px_22px_rgba(59,92,210,0.35)] hover:shadow-[0_10px_28px_rgba(59,92,210,0.45)] transition"
            aria-label="Designed by Curvea Design"
            title="Designed by Curvea Design"
          >
            <span className="h-2 w-2 rounded-full bg-white/90 shadow-[0_0_0_2px_rgba(255,255,255,0.35)]" />
            <span>Designed by Curvea Design</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
