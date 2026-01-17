import gsap from "gsap";

type PrepOpts = { prewarmBg?: boolean };

// We attach runtime props to the scene root element (grid drift + timelines)
type SceneEl = HTMLElement & {
  _gridDrift?: gsap.core.Tween | null;
  _s4tl?: gsap.core.Timeline | null;
  _s5tl?: gsap.core.Timeline | null;
  _s6tl?: gsap.core.Timeline | null;
  _s7tl?: gsap.core.Timeline | null;
};

type SceneFn = (el: SceneEl, opts?: PrepOpts) => gsap.core.Timeline | gsap.core.Tween | void;

/* ---------------- PREP (set initial inner states) ---------------- */
export const scenePrep: SceneFn[] = [
  // Scene 1 — Soft Bloom Intro (PREP)
  (el, { prewarmBg } = {}) => {
    gsap.set(el.querySelector(".hero-bg"), {
      opacity: prewarmBg ? 1 : 1,
      background:
        "radial-gradient(120% 120% at 50% 80%, var(--berry1) 0%, var(--berry2) 55%, var(--berry3) 100%)",
    });

    gsap.set(el.querySelector(".hero-bloom"), {
      opacity: 0,
      scale: 1.06,
      background:
        "radial-gradient(60% 60% at 50% 55%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0) 70%)",
      mixBlendMode: "screen",
    });

    gsap.set(el.querySelectorAll(".float-dot"), {
      autoAlpha: 0,
      y: 10,
      filter: "blur(2px)",
    });

    gsap.set(el.querySelector(".hero-logo"), { autoAlpha: 0, y: 26, scale: 0.96 });
    gsap.set(el.querySelector(".hero-heading"), {
      autoAlpha: 0,
      y: 18,
      filter: "blur(2px)",
    });
    gsap.set(el.querySelector(".hero-sub"), {
      autoAlpha: 0,
      y: 12,
      filter: "blur(2px)",
    });
    gsap.set(el.querySelectorAll(".tag"), { autoAlpha: 0, y: 10 });
    gsap.set(el.querySelector(".hero-micro"), { autoAlpha: 0, y: 10 });
  },

  // Scene 2 — Craft (PREP)
  (el, { prewarmBg } = {}) => {
    gsap.set(el.querySelector(".craft-bg"), {
      opacity: prewarmBg ? 1 : 1,
      background:
        "radial-gradient(120% 120% at 50% 85%, var(--berry1) 0%, #DDE4FF 55%, #C9D2FF 85%)",
    });
    gsap.set(el.querySelector(".craft-grid"), { x: -24, y: -14, opacity: 0.35 });
    gsap.set(el.querySelector(".craft-spot"), { xPercent: -130, opacity: 0.6 });

    gsap.set(el.querySelector(".atelier-pill"), { autoAlpha: 0, y: 10 });
    gsap.set(el.querySelector(".craft-heading"), { autoAlpha: 0, y: 18 });
    gsap.set(el.querySelector(".headline-rule"), {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(el.querySelector(".craft-sub"), { autoAlpha: 0, y: 12 });

    gsap.set(el.querySelector(".bench-panel"), { autoAlpha: 0, y: 18, scale: 0.99 });
    gsap.set(el.querySelectorAll(".bench-step"), { autoAlpha: 0, y: 16 });
    gsap.set(el.querySelectorAll(".bench-badge"), { autoAlpha: 0, scale: 0.9 });
    gsap.set(el.querySelector(".beam"), { scaleX: 0, transformOrigin: "left center" });
  },

  // Scene 3 — Whipped Air (PREP)
  (el, { prewarmBg } = {}) => {
    const img = el.querySelector(".creation-img");
    gsap.set(img, { yPercent: 100, scale: 1.06, opacity: prewarmBg ? 1 : 1 });

    gsap.set(el.querySelector(".creation-scrim"), {
      background:
        "radial-gradient(65% 55% at 50% 52%, rgba(30,33,52,0.22) 0%, rgba(30,33,52,0.42) 60%, rgba(30,33,52,0.58) 100%)",
      opacity: 0,
      mixBlendMode: "multiply",
    });

    gsap.set(el.querySelector(".content-glass"), { autoAlpha: 0, y: 8, scale: 0.98 });
    gsap.set(el.querySelector(".creation-heading"), { autoAlpha: 0, y: 18 });
    gsap.set(el.querySelector(".creation-sub"), { autoAlpha: 0, y: 12 });
    gsap.set(el.querySelector(".creation-micro"), { autoAlpha: 0, y: 10 });
  },

  // Scene 4 — Split World (PREP)
  (el) => {
    el._s4tl?.kill();
    el._s4tl = null;

    gsap.killTweensOf(el);
    gsap.set(el.querySelectorAll(".split-heading, .split-sub, .split-micro"), {
      clearProps: "all",
    });

    gsap.set(el.querySelector(".sweet-bubbles"), { autoAlpha: 1 });
    gsap.set(el.querySelector(".spice-specks"), { autoAlpha: 0 });
    gsap.set(el.querySelector(".split-card"), { autoAlpha: 0, y: 16 });
    gsap.set([el.querySelector(".split-sub"), el.querySelector(".split-micro")], {
      autoAlpha: 0,
      y: 10,
    });

    const h = el.querySelector(".split-heading") as HTMLElement | null;
    if (!h) return;

    const raw = h.getAttribute("data-text") || h.textContent || "";
    const words = raw.split(" ");
    const built = words
      .map((w) => {
        const isSavory = w.toLowerCase() === "savory";
        const chars = w
          .split("")
          .map(
            (ch, i) =>
              `<span class="char${isSavory && i === 0 ? " savory-start" : ""
              }">${ch}</span>`
          )
          .join("");
        return `<span class="w">${chars}</span>`;
      })
      .join('<span class="ws"></span>');
    h.innerHTML = built;

    gsap.set(h.querySelectorAll(".char, .ws"), { autoAlpha: 0, y: 6 });
    gsap.set(h, {
      color: "var(--ink)",
      textShadow: "0 2px 12px rgba(60,50,120,.45)",
      fontWeight: 500,
    });

    gsap.set(el.querySelector(".headline-underline"), {
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.set(el.querySelector(".split-bg"), {
      "--c1": "#4B3F72",
      "--c2": "#9E8CFF",
      "--c3": "#E4E6FF",
      backgroundPosition: "50% 85%",
      filter: "hue-rotate(0deg)",
    } as gsap.TweenVars);

    gsap.set(el.querySelector(".split-card"), { borderRadius: "22px" });

    el.querySelectorAll(".spice-specks .speck").forEach((s) => {
      gsap.set(s, {
        x: gsap.utils.random(-8, 8),
        y: gsap.utils.random(-6, 6),
        opacity: 0,
        yPercent: 0,
      });
    });
  },

  // Scene 5 — Table (PREP)
  (el) => {
    el._s5tl?.kill();
    el._s5tl = null;

    gsap.killTweensOf(el);
    gsap.set(
      el.querySelectorAll(
        ".cat-title, .cat-eyebrow, .cat-divider, .cat-sub, .cat-card, .cat-badge"
      ),
      { clearProps: "all" }
    );

    gsap.set(el.querySelector(".cat-bg"), { opacity: 1 });

    const title = el.querySelector(".cat-title") as HTMLElement | null;
    if (!title) return;

    const raw = title.getAttribute("data-text") || title.textContent || "";
    const words = raw.split(" ");
    const built = words
      .map(
        (w) =>
          `<span class="w">${w
            .split("")
            .map((ch) => `<span class="char">${ch}</span>`)
            .join("")}</span>`
      )
      .join('<span class="ws"></span>');
    title.innerHTML = built;

    gsap.set(title.querySelectorAll(".char, .ws"), { autoAlpha: 0, y: 6 });
    gsap.set(el.querySelector(".cat-eyebrow"), { autoAlpha: 0, y: 6 });
    gsap.set(el.querySelector(".cat-divider"), {
      scaleX: 0,
      transformOrigin: "center",
      autoAlpha: 0,
    });
    gsap.set(el.querySelector(".cat-sub"), { autoAlpha: 0, y: 8 });

    gsap.set(el.querySelectorAll(".cat-card"), { autoAlpha: 0, y: 12 });
    gsap.set(el.querySelectorAll(".cat-badge"), { autoAlpha: 0, y: 6 });
  },

  // Scene 6 — Heart (PREP)
  (el) => {
    el._s6tl?.kill();
    el._s6tl = null;

    const $ = (q: string) => el.querySelector(q);

    const wrap = $(".heart-wrap");
    if (!wrap) return;

    gsap.set($(".heart-eyebrow"), { autoAlpha: 0, y: 6 });
    gsap.set($(".heart-title"), { autoAlpha: 0, y: 8 });
    gsap.set($(".heart-divider"), {
      autoAlpha: 0,
      scaleX: 0,
      transformOrigin: "center",
    });

    gsap.set($(".pullq"), { autoAlpha: 0, y: 10 });
    gsap.set($(".pullq-open"), { autoAlpha: 0, y: 8 });
    gsap.set($(".pullq-close"), { autoAlpha: 0, y: -8 });
    gsap.set($(".pullq-body"), { autoAlpha: 0, y: 8 });

    gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".heart-badge")).forEach((n) => {
      gsap.set(n, { autoAlpha: 0, y: 6 });
    });

    gsap.set($(".sign-divider"), { autoAlpha: 0, scaleX: 0, transformOrigin: "center" });
    gsap.set($(".sign-name"), { autoAlpha: 0, y: 6 });
  },

  // Scene 7 — Signature (PREP)
  (el) => {
    el._s7tl?.kill();
    el._s7tl = null;

    const $ = (q: string) => el.querySelector(q);
    const $$ = (q: string) => el.querySelectorAll(q);

    if (!$(".sig-wrap")) return;

    gsap.set($(".sig-bg"), { filter: "hue-rotate(0deg) saturate(1)" });
    gsap.set($(".sig-logo"), { autoAlpha: 0, y: 8, scale: 0.96 });
    gsap.set($(".sig-title"), { autoAlpha: 0, y: 10 });
    gsap.set($(".sig-sub"), { autoAlpha: 0, y: 8 });
    gsap.set($$(".sig-ctas a"), { autoAlpha: 0, y: 10 });
    gsap.set($(".credit-line"), { autoAlpha: 0, scaleX: 0, transformOrigin: "center" });
    gsap.set($(".credit-text"), { autoAlpha: 0, y: 8 });
    gsap.set($(".curvea-link"), { autoAlpha: 0, y: 8, scale: 0.98 });
    gsap.set($(".curvea-shine"), { xPercent: -120, autoAlpha: 0 });
  },
];

/* ---------------- ENTER (play inner animations) ---------------- */
export const sceneEnter: SceneFn[] = [
  // Scene 1 (ENTER)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(el.querySelector(".hero-bloom"), { opacity: 1, scale: 1.0, duration: 1 }, 0);
    tl.to(el.querySelector(".hero-logo"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, 0.15);

    tl.to(
      el.querySelector(".hero-heading"),
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
      "-=0.3"
    ).to(
      el.querySelector(".hero-sub"),
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 },
      "-=0.45"
    );

    tl.to(el.querySelectorAll(".tag"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.3");
    tl.to(el.querySelector(".hero-micro"), { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.28");

    const dots = el.querySelectorAll(".float-dot");
    gsap.to(dots, { autoAlpha: 0.18, y: 0, duration: 0.6, stagger: 0.05, ease: "power1.out" });

    dots.forEach((d, i) => {
      gsap.to(d, {
        y: i % 2 ? -6 : -10,
        x: i % 3 ? 6 : -6,
        duration: 6 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return tl;
  },

  // Scene 2 (ENTER)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(el.querySelector(".craft-spot"), { xPercent: 140, duration: 1.5 }, 0);

    el._gridDrift = gsap.to(el.querySelector(".craft-grid"), {
      x: "+=42",
      y: "+=22",
      duration: 18,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    tl.to(el.querySelector(".atelier-pill"), { autoAlpha: 1, y: 0, duration: 0.4 }, 0.08)
      .to(el.querySelector(".craft-heading"), { autoAlpha: 1, y: 0, duration: 0.6 }, "-=1.0")
      .to(el.querySelector(".headline-rule"), { scaleX: 1, duration: 0.6 }, "-=0.35")
      .to(el.querySelector(".craft-sub"), { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.35");

    tl.to(el.querySelector(".bench-panel"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, "-=0.25")
      .to(el.querySelectorAll(".bench-step"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.1")
      .to(el.querySelectorAll(".bench-badge"), { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.06 }, "-=0.3")
      .to(el.querySelector(".beam"), { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.4");

    return tl;
  },

  // Scene 3 (ENTER)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const img = el.querySelector(".creation-img");
    const scrim = el.querySelector(".creation-scrim");

    tl.addLabel("slide", 0)
      .to(img, { yPercent: 0, duration: 1.0 }, "slide")
      .to(img, { scale: 1.1, duration: 6, ease: "sine.inOut" }, "slide")
      .to(scrim, { opacity: 1, duration: 0.5 }, "slide+=0.80")
      .to(el.querySelector(".content-glass"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 }, "slide+=1.00")
      .to(el.querySelector(".creation-heading"), { autoAlpha: 1, y: 0, duration: 0.55 }, "slide+=1.05")
      .to(el.querySelector(".creation-sub"), { autoAlpha: 1, y: 0, duration: 0.5 }, "slide+=1.12")
      .to(el.querySelector(".creation-micro"), { autoAlpha: 1, y: 0, duration: 0.45 }, "slide+=1.18");

    return tl;
  },

  // Scene 4 (ENTER)
  (el) => {
    const bg = el.querySelector(".split-bg");
    const h = el.querySelector(".split-heading") as HTMLElement | null;
    if (!h) return;

    const chars = h.querySelectorAll(".char, .ws");
    let morphed = false;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(el.querySelector(".split-card"), { autoAlpha: 1, y: 0, duration: 0.4 }, 0);

    tl.to(
      chars,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.02,
        stagger: {
          each: 0.035,
          onStart() {
            if (morphed) return;
            const t = (Array.isArray((this as any).targets?.()) ? (this as any).targets()[0] : null) as HTMLElement | null;
            if (!t) return;
            if (t.classList.contains("savory-start")) {
              morphed = true;

              gsap.to(bg, {
                "--c1": "#E8E1D2",
                "--c2": "#D8D1C2",
                "--c3": "#C9C1B2",
                backgroundPosition: "0% 100%",
                filter: "hue-rotate(-24deg)",
                duration: 1.1,
                ease: "power1.inOut",
              } as gsap.TweenVars);

              gsap.to(h, {
                color: "#2C2B29",
                textShadow: "0 0 0 rgba(0,0,0,0)",
                fontWeight: 600,
                duration: 0.8,
                ease: "power2.out",
              });

              gsap.to(el.querySelector(".headline-underline"), {
                scaleX: 1,
                background:
                  "linear-gradient(90deg, rgba(210,180,140,0.5), rgba(150,120,80,0.9))",
                duration: 0.7,
                ease: "power2.out",
              });

              gsap.to(el.querySelector(".sweet-bubbles"), { autoAlpha: 0, duration: 0.8 });
              gsap.to(el.querySelectorAll(".spice-specks .speck"), {
                opacity: 0.5,
                yPercent: -12,
                duration: 1.0,
                stagger: 0.04,
                ease: "sine.out",
              });

              gsap.to(el.querySelector(".split-card"), {
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "36px",
                borderBottomLeftRadius: "36px",
                borderBottomRightRadius: "0px",
                duration: 1.0,
                ease: "power2.out",
              });
            }
          },
        },
      },
      0.08
    );

    tl.to(el.querySelector(".split-sub"), { autoAlpha: 1, y: 0, duration: 0.5 }, "+=0.3");
    tl.to(el.querySelector(".split-micro"), { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.25");

    el._s4tl = tl;
    return tl;
  },

  // Scene 5 (ENTER)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    const chars = el.querySelectorAll(".cat-title .char, .cat-title .ws");
    const cards = el.querySelectorAll(".cat-card");
    const badges = el.querySelectorAll(".cat-badge");

    tl.to(el.querySelector(".cat-eyebrow"), { autoAlpha: 1, y: 0, duration: 0.35 }, 0.0);
    tl.to(chars, { autoAlpha: 1, y: 0, duration: 0.02, stagger: 0.028 }, 0.1);
    tl.to(el.querySelector(".cat-divider"), { autoAlpha: 1, scaleX: 1, duration: 0.5 }, 0.55);
    tl.to(el.querySelector(".cat-sub"), { autoAlpha: 1, y: 0, duration: 0.45 }, 0.65);

    tl.to(
      cards,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.08,
        onStart() {
          const card = this.targets()[0] as HTMLElement;
          const head = card.querySelector(".cat-card-head");
          if (!head) return;
          gsap.fromTo(
            head,
            { "--accentW": "0%" } as gsap.TweenVars,
            { "--accentW": "100%", duration: 0.6, ease: "power2.out" } as gsap.TweenVars
          );
        },
      },
      0.8
    );

    tl.to(badges, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06 }, 1.1);

    el._s5tl = tl;
    return tl;
  },

  // Scene 6 (ENTER)
  (el) => {
    const $ = (q: string) => el.querySelector(q);
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to($(".heart-eyebrow"), { autoAlpha: 1, y: 0, duration: 0.32 }, 0.0)
      .to($(".heart-title"), { autoAlpha: 1, y: 0, duration: 0.4 }, 0.08)
      .to($(".heart-divider"), { autoAlpha: 1, scaleX: 1, duration: 0.45 }, 0.22);

    tl.to($(".pullq"), { autoAlpha: 1, y: 0, duration: 0.3 }, 0.34)
      .to($(".pullq-open"), { autoAlpha: 0.35, y: 0, duration: 0.3 }, 0.36)
      .to($(".pullq-body"), { autoAlpha: 1, y: 0, duration: 0.42 }, 0.42)
      .to($(".pullq-close"), { autoAlpha: 0.35, y: 0, duration: 0.3 }, 0.52);

    tl.to($(".sign-divider"), { autoAlpha: 1, scaleX: 1, duration: 0.45 }, 0.7)
      .to($(".sign-name"), { autoAlpha: 1, y: 0, duration: 0.35 }, 0.82)
      .to(el.querySelectorAll(".heart-badge"), { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.06 }, 0.9);

    el._s6tl = tl;
    return tl;
  },

  // Scene 7 (ENTER)
  (el) => {
    const $ = (q: string) => el.querySelector(q);
    const $$ = (q: string) => el.querySelectorAll(q);

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to($(".sig-bg"), { filter: "hue-rotate(-8deg) saturate(1.05)", duration: 0.8 }, 0);

    tl.to($(".sig-logo"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 }, 0.05)
      .to($(".sig-title"), { autoAlpha: 1, y: 0, duration: 0.45 }, 0.15)
      .to($(".sig-sub"), { autoAlpha: 1, y: 0, duration: 0.4 }, 0.28);

    tl.to($$(".sig-ctas a"), { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.08 }, 0.42);

    tl.to($(".credit-line"), { autoAlpha: 1, scaleX: 1, duration: 0.5 }, 0.62)
      .to($(".credit-text"), { autoAlpha: 1, y: 0, duration: 0.4 }, 0.72)
      .to($(".curvea-link"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.38 }, 0.78);

    tl.to(
      $(".curvea-shine"),
      {
        autoAlpha: 1,
        xPercent: 120,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete() {
          gsap.set(this.targets(), { autoAlpha: 0, xPercent: 120 });
        },
      },
      0.92
    );

    el._s7tl = tl;
    return tl;
  },
];

/* ---------------- EXIT (fade current content while next arrives) ---------------- */
export const sceneExit: SceneFn[] = [
  // Scene 1 (EXIT)
  (el) => {
    gsap.to(
      [el.querySelector(".hero-heading"), el.querySelector(".hero-sub"), el.querySelectorAll(".tag"), el.querySelector(".hero-micro")],
      { autoAlpha: 0, y: -8, duration: 0.32, stagger: 0.03, ease: "power2.out", overwrite: "auto" }
    );
    gsap.to(el.querySelector(".hero-bloom"), { opacity: 0.6, duration: 0.4, ease: "power1.out" });
  },

  // Scene 2 (EXIT)
  (el) => {
    if (el._gridDrift) {
      el._gridDrift.kill();
      el._gridDrift = null;
    }
    gsap.to(
      [el.querySelector(".craft-heading"), el.querySelector(".craft-sub"), el.querySelectorAll(".bench-step")],
      { autoAlpha: 0, y: -8, duration: 0.32, stagger: 0.04, ease: "power2.out", overwrite: "auto" }
    );
  },

  // Scene 3 (EXIT)
  (el) => {
    const img = el.querySelector(".creation-img");

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(el.querySelector(".content-glass"), { autoAlpha: 0, y: -6, duration: 0.25 }, 0)
      .to(
        [el.querySelector(".creation-heading"), el.querySelector(".creation-sub"), el.querySelector(".creation-micro")],
        { autoAlpha: 0, y: -8, duration: 0.25, stagger: 0.03 },
        0
      );

    tl.to(el.querySelector(".creation-scrim"), { opacity: 0.6, duration: 0.3 }, 0.05);
    tl.to(img, { yPercent: -100, duration: 0.9, ease: "power2.in" }, 0.18);
    return tl;
  },

  // Scene 4 (EXIT)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to([el.querySelector(".split-heading"), el.querySelector(".split-sub"), el.querySelector(".split-micro")], {
      autoAlpha: 0,
      y: -8,
      duration: 0.28,
      stagger: 0.05,
    });
    tl.to(el.querySelector(".split-card"), { autoAlpha: 0, y: -10, duration: 0.3 }, 0);
    return tl;
  },

  // Scene 5 (EXIT)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to([el.querySelector(".cat-title"), el.querySelector(".cat-sub"), el.querySelector(".cat-eyebrow")], {
      autoAlpha: 0,
      y: -8,
      duration: 0.28,
      stagger: 0.04,
    });
    tl.to(el.querySelectorAll(".cat-card"), { autoAlpha: 0, y: 10, duration: 0.25, stagger: 0.04 }, 0);
    tl.to(el.querySelectorAll(".cat-badge"), { autoAlpha: 0, y: 8, duration: 0.2, stagger: 0.04 }, 0.02);
    return tl;
  },

  // Scene 6 (EXIT)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to([el.querySelector(".heart-title"), el.querySelector(".heart-eyebrow"), el.querySelector(".pullq-body")], {
      autoAlpha: 0,
      y: -8,
      duration: 0.24,
      stagger: 0.04,
    })
      .to(el.querySelectorAll(".heart-badge"), { autoAlpha: 0, y: 8, duration: 0.18, stagger: 0.04 }, 0.02)
      .to([el.querySelector(".pullq-open"), el.querySelector(".pullq-close")], { autoAlpha: 0, duration: 0.18 }, 0.02)
      .to([el.querySelector(".sign-name")], { autoAlpha: 0, y: -6, duration: 0.18 }, 0.02)
      .to([el.querySelector(".sign-divider"), el.querySelector(".heart-divider")], { autoAlpha: 0, scaleX: 0, duration: 0.22 }, 0.02);
    return tl;
  },

  // Scene 7 (EXIT)
  (el) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(el.querySelectorAll(".sig-title, .sig-sub, .sig-logo"), {
      autoAlpha: 0,
      y: -10,
      duration: 0.25,
      stagger: 0.04,
    })
      .to(el.querySelectorAll(".sig-ctas a"), { autoAlpha: 0, y: -8, duration: 0.2, stagger: 0.04 }, 0.02)
      .to([el.querySelector(".credit-text"), el.querySelector(".curvea-link")], { autoAlpha: 0, y: -6, duration: 0.2 }, 0.02)
      .to([el.querySelector(".credit-line")], { autoAlpha: 0, scaleX: 0, duration: 0.22 }, 0.02)
      .to([el.querySelector(".sig-bg")], { filter: "hue-rotate(0deg) saturate(1)", duration: 0.4 }, 0.0);
    return tl;
  },
];
