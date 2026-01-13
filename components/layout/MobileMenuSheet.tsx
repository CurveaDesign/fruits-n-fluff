import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { X, PhoneCall, Cake, UtensilsCrossed, Info } from "lucide-react";

// Prevent SSR layout-effect warning + keep behavior consistent.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function lockBodyScroll() {
  const body = document.body;
  const scrollY = window.scrollY || window.pageYOffset;
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
  return () => {
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.overflow = "";
    window.scrollTo(0, scrollY);
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenuSheet({ open, onClose }: Props) {
  const router = useRouter();
  const pathname = router.asPath.split("?")[0] || "/";

  // Hydration fix: server renders null, client also renders null until mounted.
  const [mounted, setMounted] = useState(false);

  // For GSAP reverse animation: keep mounted while closing, unmount after reverse completes.
  const [renderSheet, setRenderSheet] = useState(open);

  const tl = useRef<any>(null);
  const prevOpen = useRef(open);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setRenderSheet(true);
    } else {
      // If GSAP isn't ready, we won't get onReverseComplete.
      if (!tl.current) setRenderSheet(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const unlock = lockBodyScroll();
    return unlock;
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (!backdropRef.current || !sheetRef.current) return;

    let killed = false;

    (async () => {
      const gsapMod = await import("gsap");
      const gsap: any = (gsapMod as any).default ?? (gsapMod as any).gsap ?? gsapMod;

      if (killed) return;

      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(sheetRef.current, { yPercent: 100 });

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      timeline
        .to(backdropRef.current, { opacity: 1, duration: 0.25 }, 0)
        .to(sheetRef.current, { yPercent: 0, duration: 0.35, force3D: true }, 0.03)
        .progress(0)
        .pause();

      tl.current = timeline;
    })();

    return () => {
      killed = true;
      try {
        tl.current?.kill?.();
      } catch {
        // ignore
      }
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (prevOpen.current === open) return;

    if (open) {
      setRenderSheet(true);
      try {
        tl.current.eventCallback?.("onReverseComplete", null);
      } catch {
        // ignore
      }
      tl.current.play();
    } else {
      try {
        tl.current.eventCallback?.("onReverseComplete", () => setRenderSheet(false));
      } catch {
        // ignore
      }
      tl.current.reverse();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const linkClass = (to: string) =>
    [
      "flex items-center gap-3 text-xl py-3 px-2 rounded-lg transition-colors",
      pathname.startsWith(to)
        ? "text-[color:var(--blueberry,#3b5cd2)] bg-[color:var(--blueberry,#3b5cd2)]/10"
        : "text-black/90 hover:bg-black/5",
    ].join(" ");

  // IMPORTANT: avoid hydration mismatch
  if (!mounted) return null;
  if (!renderSheet) return null;

  const overlay = (
    <div
      className={["fixed inset-0 z-[110]", open ? "pointer-events-auto" : "pointer-events-none", "overscroll-none"].join(
        " "
      )}
      aria-hidden={!open}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-2xl"
        onClick={onClose}
        style={{ willChange: "opacity", touchAction: "none" }}
        onWheelCapture={(e) => e.preventDefault()}
        onTouchMoveCapture={(e) => e.preventDefault()}
      />

      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-black/10 bg-white/90 backdrop-blur-2xl transform-gpu max-h-[75vh] overflow-y-auto overscroll-contain"
        role="dialog"
        aria-modal="true"
        style={{ willChange: "transform", WebkitBackfaceVisibility: "hidden" }}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
      >
        <div className="relative pt-4">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-black/15" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-4 top-2 inline-flex w-10 h-10 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-8 pt-4">
          <nav className="space-y-2">
            <Link href="/menu/cakes" onClick={onClose} className={linkClass("/menu/cakes")}>
              <Cake size={20} /> Cakes
            </Link>
            <Link href="/menu/catering" onClick={onClose} className={linkClass("/menu/catering")}>
              <UtensilsCrossed size={20} /> Catering
            </Link>
            <Link href="/about" onClick={onClose} className={linkClass("/about")}>
              <Info size={20} /> About
            </Link>
          </nav>

          <a
            href="https://wa.me/96171975948"
            target="_blank"
            rel="noopener"
            onClick={onClose}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium text-white"
            style={{ backgroundColor: "var(--blueberry,#3b5cd2)" }}
          >
            <PhoneCall size={18} /> Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
