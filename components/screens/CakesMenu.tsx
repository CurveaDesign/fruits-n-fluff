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
  // handles "vegan.md", "cakeSections/vegan.md", etc.
  return ref.split("/").pop()!.replace(/\.md$/i, "");
}

export default function CakesMenu({ cakeSections, cakeBadges, cakes }: Props) {
  const badgeMap = new Map(cakeBadges.map((b) => [b.slug, b]));
  const sectionMap = new Map(cakeSections.map((s) => [s.slug, s]));

  // group cakes by section slug
  const cakesBySection = new Map<string, Cake[]>();
  for (const cake of cakes) {
    const key = refToSlug(cake.section);
    if (!cakesBySection.has(key)) cakesBySection.set(key, []);
    cakesBySection.get(key)!.push(cake);
  }

  // sections ordered by PageCMS "order"
  const orderedSections = [...cakeSections]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      items: cakesBySection.get(s.slug) ?? [],
    }))
    .filter((s) => s.items.length > 0);

  return (
    <>
      <NavBar variant="cakes" />
      <main className="min-h-screen bg-gradient-to-b from-[var(--blueberry-50)] to-white pt-[var(--nav-h)]">
        <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-24 space-y-16">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--blueberry-800)]">Cakes Menu</h1>
            <p className="mt-3 text-[var(--blueberry-700)]/80">
              A handcrafted selection inspired by nature and celebration.
            </p>
          </header>

          {orderedSections.map((section) => (
            <section key={section.slug}>
              <div
                className={[
                  "rounded-2xl border px-5 py-6 mb-6",
                  "bg-gradient-to-r",
                  // keep your existing gradients if you want; for now we reuse one
                  "from-[var(--blueberry-100)] via-[var(--blueberry-50)] to-white",
                  "border-[var(--blueberry-300)]/40",
                ].join(" ")}
              >
                <h2 className="text-2xl font-semibold text-[var(--blueberry-800)]">{section.title}</h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((cake) => (
                  <CakeCard
                    key={cake.slug}
                    cake={cake}
                    badgeMap={badgeMap}
                    sectionTitle={sectionMap.get(cake.section)?.title}
                  />
                ))}
              </div>
            </section>
          ))}

          {orderedSections.length === 0 && (
            <div className="py-20 text-center text-[var(--blueberry-700)] opacity-70">
              Menu is being updated. Please check back soon.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
