import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Dock from "@/components/layout/Dock";
import MobileMenuSheet from "@/components/layout/MobileMenuSheet";

type Props = {
  variant?: "cakes" | "catering" | "default";
};

export default function NavBar({ variant = "default" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // (variant is kept for future styling hooks)
  void variant;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] h-[var(--nav-h,6.5rem)] flex items-center transition-colors",
        scrolled
          ? "backdrop-blur-xl bg-white/70 supports-[backdrop-filter]:bg-white/50 border-b border-black/5"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Home" className="flex items-center shrink-0">
            <img
              src="/brand/fruits-n-fluff-logo.png"
              alt="Fruits n Fluff"
              className="h-16 w-16 md:h-20 md:w-20 object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <Dock />
          </div>

          <button
            className="md:hidden w-11 h-11 grid place-items-center rounded-full border border-black/10 bg-white/60 backdrop-blur"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <MobileMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
