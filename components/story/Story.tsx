import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import Lenis from "lenis";

import { scenePrep, sceneEnter, sceneExit } from "./registry";

import Scene1_Awakening from "./scenes/Scene1_Awakening";
import Scene2_Craft from "./scenes/Scene2_Craft";
import Scene3_WhippedAir from "./scenes/Scene3_WhippedAir";
import Scene4_SplitWorld from "./scenes/Scene4_SplitWorld";
import Scene5_Catering from "./scenes/Scene5_Catering";
import Scene6_Heart from "./scenes/Scene6_Heart";
import Scene7_Signature from "./scenes/Scene7_Signature";

gsap.registerPlugin(Observer);

export default function Story() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const idx = useRef(0);
  const anim = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);
  const observerRef = useRef<Observer | null>(null);

  useEffect(() => {
    document.body.classList.add("lock-scroll");

    const lenis = new Lenis({ smoothWheel: true, duration: 0.9 });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      document.body.classList.remove("lock-scroll");
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".ff-scene"));

    gsap.set(scenes, {
      position: "absolute",
      inset: 0,
      opacity: 0,
      scale: 1.015,
      pointerEvents: "none",
      zIndex: 0,
      willChange: "opacity,transform",
      force3D: true,
      backfaceVisibility: "hidden",
    });

    // First scene
    scenePrep[0]?.(scenes[0], { prewarmBg: true });
    gsap.set(scenes[0], { opacity: 1, scale: 1, pointerEvents: "auto", zIndex: 1 });
    sceneEnter[0]?.(scenes[0]);

    const goTo = (next: number) => {
      if (anim.current) return;

      const cur = idx.current;
      if (next === cur || next < 0 || next >= scenes.length) return;

      anim.current = true;

      const from = scenes[cur];
      const to = scenes[next];

      scenePrep[next]?.(to, { prewarmBg: true });

      // Special: Scene 2 -> Scene 3 (index 1 -> 2)
      if (cur === 1 && next === 2) {
        gsap.set(to, { opacity: 1, scale: 1.0, pointerEvents: "auto", zIndex: 2 });
        gsap.set(from, { opacity: 1, zIndex: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            gsap.set(from, { opacity: 0, pointerEvents: "none", zIndex: 0 });
            gsap.set(to, { pointerEvents: "auto", zIndex: 1 });
            idx.current = next;
            anim.current = false;
          },
        });

        tl.add(() => {
          sceneEnter[next]?.(to);
        }, 0).to(from, { opacity: 0, duration: 0.25 }, 1.02);

        return;
      }

      // Special: Scene 3 -> Scene 4 (index 2 -> 3)
      if (cur === 2 && next === 3) {
        gsap.set(to, { opacity: 1, scale: 1.0, pointerEvents: "none", zIndex: 1 });
        gsap.set(from, { opacity: 1, zIndex: 2 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            gsap.set(from, { opacity: 0, pointerEvents: "none", zIndex: 0 });
            gsap.set(to, { pointerEvents: "auto", zIndex: 1 });
            idx.current = next;
            anim.current = false;
          },
        });

        const exitTl = sceneExit[cur]?.(from) || gsap.timeline({ duration: 0 });
        tl.add(exitTl, 0).add(() => {
          sceneEnter[next]?.(to);
        });

        return;
      }

      // Default crossfade
      sceneExit[cur]?.(from);
      gsap.set(to, { opacity: 0, scale: 1.002, pointerEvents: "auto", zIndex: 2 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(from, { opacity: 0, pointerEvents: "none", zIndex: 0 });
          gsap.set(to, { pointerEvents: "auto", zIndex: 1 });
          idx.current = next;
          anim.current = false;
        },
      });

      tl.to(from, { opacity: 0, scale: 1.01, duration: 0.8 }, 0)
        .to(to, { opacity: 1, scale: 1.0, duration: 0.8 }, 0)
        .add(() => {
          sceneEnter[next]?.(to);
        }, 0.25);

    };

    const onSkip = () => goTo(scenes.length - 1);

    const skipBtn = root.querySelector<HTMLButtonElement>("[data-skip]");
    skipBtn?.addEventListener("click", onSkip);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") goTo(idx.current + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") goTo(idx.current - 1);
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(scenes.length - 1);
    };
    window.addEventListener("keydown", onKey);

    observerRef.current = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 1,
      tolerance: 10,
      preventDefault: true,
      onDown: () => goTo(idx.current + 1),
      onUp: () => goTo(idx.current - 1),
    });

    return () => {
      skipBtn?.removeEventListener("click", onSkip);
      window.removeEventListener("keydown", onKey);
      observerRef.current?.kill();
      observerRef.current = null;
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-screen h-[100svh] overflow-hidden">
      {/* Skip */}
      <div className="ff-skip absolute z-20 right-3 sm:right-4 top-3 sm:top-4">
        <button
          data-skip
          className="rounded-full px-3 py-1.5 text-xs sm:text-sm bg-white/90 backdrop-blur border border-black/10 text-ink shadow hover:scale-[1.03] transition"
        >
          Skip story
        </button>
      </div>

      <Scene1_Awakening />
      <Scene2_Craft />
      <Scene3_WhippedAir />
      <Scene4_SplitWorld />
      <Scene5_Catering />
      <Scene6_Heart />
      <Scene7_Signature />
    </section>
  );
}
