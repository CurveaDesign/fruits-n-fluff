import { useMemo, useState } from "react";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import CakeCard from "@/components/cakes/CakeCard";

import type { Cake, CakeBadge, CakeSection } from "@/lib/content/types";

type Props = {
  cakeSections: CakeSection[];
  cakeBadges: CakeBadge[];
  cakes: Cake[];
};

function refToSlug(ref?: string) {
  if (!ref) return "";
  return ref.split("/").pop()!.replace(/\.md$/i, "");
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type SectionFilter = "all" | string;

export default function CakesMenu({ cakeSections, cakeBadges, cakes }: Props) {
  const badgeMap = useMemo(() => new Map(cakeBadges.map((b) => [b.slug, b])), [cakeBadges]);
  const sectionBySlug = useMemo(
    () => new Map(cakeSections.map((s) => [s.slug, s])),
    [cakeSections]
  );

  const [q, setQ] = useState("");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");

  // group cakes by section slug
  const cakesBySection = useMemo(() => {
    const map = new Map<string, Cake[]>();
    for (const cake of cakes) {
      const key = refToSlug((cake as any).section);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(cake);
    }
    return map;
  }, [cakes]);

  // sections (order only for display)
  const orderedSections = useMemo(() => {
    return [...cakeSections]
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .map((s) => ({
        slug: s.slug,
        title: s.title,
        items: cakesBySection.get(s.slug) ?? [],
      }))
      .filter((s) => s.items.length > 0);
  }, [cakeSections, cakesBySection]);

  // pills options
  const sectionOptions = useMemo(() => {
    return orderedSections.map((s) => ({ slug: s.slug, title: s.title }));
  }, [orderedSections]);

  // filtering + search across name/description/flavors/badges/section title
  const filteredSections = useMemo(() => {
    const query = normalize(q);

    const matches = (cake: Cake) => {
      const cakeSectionSlug = refToSlug((cake as any).section);

      // section filter
      if (sectionFilter !== "all" && cakeSectionSlug !== sectionFilter) return false;

      // no search
      if (!query) return true;

      const name = normalize(String((cake as any).name ?? ""));
      const desc = normalize(String((cake as any).description ?? ""));

      const flavors = ((cake as any).flavors ?? []) as string[];
      const flavorsText = normalize(flavors.join(" "));

      const badgeRefs = (((cake as any).badges ?? []) as string[]) || [];
      const badgeSlugs = badgeRefs.map(refToSlug);
      const badgeSlugText = normalize(badgeSlugs.join(" "));

      const badgeLabels = badgeSlugs
        .map((slug) => {
          const b = badgeMap.get(slug);
          return b?.short || b?.title || slug;
        })
        .filter(Boolean) as string[];
      const badgeLabelText = normalize(badgeLabels.join(" "));

      const sectionTitle = normalize(sectionBySlug.get(cakeSectionSlug)?.title ?? "");

      const hay = [name, desc, flavorsText, badgeSlugText, badgeLabelText, sectionTitle]
        .filter(Boolean)
        .join(" ");

      return hay.includes(query);
    };

    return orderedSections
      .map((sec) => ({ ...sec, items: sec.items.filter(matches) }))
      .filter((sec) => sec.items.length > 0);
  }, [q, sectionFilter, orderedSections, badgeMap, sectionBySlug]);

  const clearAll = () => {
    setQ("");
    setSectionFilter("all");
  };

  const hasFilters = q.trim().length > 0 || sectionFilter !== "all";

  return (
    <>
      <NavBar variant="cakes" />

      <main className="min-h-screen bg-gradient-to-b from-[var(--blueberry-50)] to-white pt-[var(--nav-h)]">
        <section className="max-w-7xl mx-auto px-6 pt-10 md:pt-14 pb-24 space-y-10">
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--blueberry-800)]">
              Cakes Menu
            </h1>
            <p className="mt-3 text-[var(--blueberry-700)]/80">
              A handcrafted selection inspired by nature and celebration.
            </p>
          </header>

          {/* Compact Search + Pills (NO sticky, NO dropdown) */}
          <div className="rounded-2xl border border-[var(--blueberry-200)]/50 bg-white/70 backdrop-blur-xl px-4 py-4">
            <div className="flex flex-col gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search cakes, flavors, badges…"
                className={[
                  "w-full rounded-xl border border-[var(--blueberry-200)]/60 bg-white/80",
                  "px-3 py-2.5 text-sm text-[var(--blueberry-900)]",
                  "placeholder:text-[var(--blueberry-700)]/60",
                  "outline-none focus:ring-2 focus:ring-[var(--blueberry-300)]/60",
                ].join(" ")}
              />

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSectionFilter("all")}
                  className={[
                    "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
                    sectionFilter === "all"
                      ? "bg-[var(--blueberry-600)] text-white border-[var(--blueberry-600)]"
                      : "bg-white/70 text-[var(--blueberry-900)] border-[var(--blueberry-200)]/70 hover:bg-[var(--blueberry-50)]",
                  ].join(" ")}
                >
                  All
                </button>

                {sectionOptions.map((s) => {
                  const active = sectionFilter === s.slug;
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => setSectionFilter(s.slug)}
                      className={[
                        "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
                        active
                          ? "bg-[var(--blueberry-600)] text-white border-[var(--blueberry-600)]"
                          : "bg-white/70 text-[var(--blueberry-900)] border-[var(--blueberry-200)]/70 hover:bg-[var(--blueberry-50)]",
                      ].join(" ")}
                    >
                      {s.title}
                    </button>
                  );
                })}

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="ml-auto rounded-full px-3 py-1.5 text-xs font-semibold border border-[var(--blueberry-200)]/70 bg-white/70 text-[var(--blueberry-800)] hover:bg-[var(--blueberry-50)] transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sections */}
          {filteredSections.map((section) => (
            <section key={section.slug}>
              <div
                className={[
                  "rounded-2xl border px-5 py-6 mb-6",
                  "bg-gradient-to-r",
                  "from-[var(--blueberry-100)] via-[var(--blueberry-50)] to-white",
                  "border-[var(--blueberry-300)]/40",
                ].join(" ")}
              >
                <h2 className="text-2xl font-semibold text-[var(--blueberry-800)]">{section.title}</h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((cake) => (
                  <CakeCard key={(cake as any).slug} cake={cake} badgeMap={badgeMap} />
                ))}
              </div>
            </section>
          ))}

          {filteredSections.length === 0 && (
            <div className="py-20 text-center text-[var(--blueberry-700)] opacity-70">
              No cakes match your search.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
