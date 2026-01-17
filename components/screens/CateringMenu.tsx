import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

import PlatDuJourCard from "@/components/catering/PlatDuJourCard";
import SignatureCard from "@/components/catering/SignatureCard";

import type {
  CateringItem,
  CateringSection,
  PlatDuJourWeek,
  PlatDuJourDayName,
} from "@/lib/content/types";

type Props = {
  cateringSections: CateringSection[];
  cateringItems: CateringItem[];
  platWeeks: PlatDuJourWeek[];
};

const DAYS: PlatDuJourDayName[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const ACCENT = "#bca87c";

function refToSlug(ref?: string) {
  if (!ref) return "";
  return ref.split("/").pop()!.replace(/\.md$/i, "");
}

function startOfDayLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function parseYYYYMMDDLocal(s?: string) {
  if (!s) return null;
  const parts = String(s).split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  return new Date(y, m - 1, d);
}

export default function CateringMenu({ cateringSections, cateringItems, platWeeks }: Props) {
  // Pick the most recent active week by weekStart
  const activeWeek = useMemo(() => {
    const weeks = (platWeeks || []).filter((w) => w.isActive !== false && w.weekStart);
    weeks.sort((a, b) => String(b.weekStart).localeCompare(String(a.weekStart)));
    return weeks[0] ?? null;
  }, [platWeeks]);

  const weekStartDate = useMemo(() => parseYYYYMMDDLocal(activeWeek?.weekStart), [activeWeek]);

  const activeSignatures = useMemo(() => {
    return (cateringItems || [])
      .filter((i) => i.isActive !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [cateringItems]);

  const itemsBySection = useMemo(() => {
    const map = new Map<string, CateringItem[]>();
    for (const item of activeSignatures) {
      const secSlug = refToSlug(item.sectionRef);
      if (!map.has(secSlug)) map.set(secSlug, []);
      map.get(secSlug)!.push(item);
    }
    return map;
  }, [activeSignatures]);

  const orderedSections = useMemo(() => {
    const secs = [...(cateringSections || [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return secs
      .map((s) => ({ ...s, items: itemsBySection.get(s.slug) ?? [] }))
      .filter((s) => s.items.length > 0);
  }, [cateringSections, itemsBySection]);

  const hasPlatAny = useMemo(() => {
    if (!activeWeek) return false;
    return (activeWeek.days || []).some((d) => d && d.isSet);
  }, [activeWeek]);

  // ✅ Coming soon only when truly empty
  const shouldShowComingSoon = !hasPlatAny && activeSignatures.length === 0;

  // Client-safe "past/today" (no hydration mismatch)
  const [todayLocal, setTodayLocal] = useState<Date | null>(null);
  useEffect(() => {
    setTodayLocal(startOfDayLocal(new Date()));
  }, []);

  // Normalize week days into a lookup
  const weekDayMap = useMemo(() => {
    const map = new Map<string, any>();
    for (const d of (activeWeek?.days || []) as any[]) {
      if (d?.day) map.set(String(d.day), d);
    }
    return map;
  }, [activeWeek]);

  if (shouldShowComingSoon) {
    return (
      <>
        <NavBar />

        <main className="min-h-screen pt-[var(--nav-h,6.5rem)] bg-gradient-to-b from-[#f8f7f4] to-white">
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <p className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/70 backdrop-blur">
              Catering Menu
            </p>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-[#2f2f2f]">
              Coming Soon
            </h1>

            <p className="mt-5 text-lg text-black/60 leading-relaxed">
              We’re finishing the catering section to match the same premium level as the cake menu. If you need catering
              now, message us and we’ll guide you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/96171975948"
                target="_blank"
                rel="noopener"
                className="rounded-2xl px-6 py-3 text-base font-medium text-white"
                style={{ backgroundColor: "var(--blueberry,#3b5cd2)" }}
              >
                Contact on WhatsApp
              </a>

              <Link
                href="/menu/cakes"
                className="rounded-2xl px-6 py-3 text-base font-medium border border-black/10 bg-white/70 backdrop-blur"
              >
                Browse Cakes Menu
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      {/* OLD DESIGN SHELL */}
      <main className="min-h-screen bg-gradient-to-b from-[#f8f7f4] to-white pt-[var(--nav-h,6.5rem)]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header: same rhythm as old */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#2f2f2f]">Catering Menu</h1>
            <p className="mt-3 text-[#555]/80">
              Sophisticated flavors crafted with passion — explore our weekly &amp; signature dishes.
            </p>
          </header>

          {/* Plat du Jour — This Week */}
          {activeWeek && (
            <section className="mb-20">
              <p className="text-sm text-black/55 mt-1 pb-4">
                Prepared fresh — please order at least <span className="font-medium">1 day in advance</span>.
              </p>


              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {DAYS.map((day, idx) => {
                  const raw = weekDayMap.get(day);

                  const item =
                    raw && raw.isSet
                      ? {
                        name: String(raw.name || "").trim(),
                        description: raw.description ? String(raw.description) : undefined,
                        price:
                          raw.priceLabel != null && String(raw.priceLabel).trim() !== ""
                            ? String(raw.priceLabel).trim()
                            : undefined,
                        image: raw.image ? String(raw.image) : undefined,
                      }
                      : null;

                  const safeItem = item?.name ? item : null;

                  let isPast = false;
                  let isToday = false;

                  if (todayLocal && weekStartDate) {
                    const thisDate = startOfDayLocal(addDays(weekStartDate, idx));
                    isPast = thisDate.getTime() < todayLocal.getTime();
                    isToday = thisDate.getTime() === todayLocal.getTime();
                  }

                  return (
                    <PlatDuJourCard
                      key={day}
                      day={day}
                      item={safeItem}
                      isPast={isPast}
                      isToday={isToday}
                      accent={ACCENT}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Signature Dishes */}
          {orderedSections.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: ACCENT }}>
                Signature Dishes
              </h2>

              {/* Old design uses a slightly airier grid */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {orderedSections.flatMap((sec) =>
                  sec.items.map((it) => (
                    <SignatureCard
                      key={it.slug}
                      item={{
                        name: it.name,
                        description: it.description,
                        image: it.image || "/catering/placeholder.jpg",
                        price: it.priceLabel ? String(it.priceLabel).trim() : undefined,
                      }}
                      accent={ACCENT}
                    />
                  ))
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
