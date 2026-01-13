import type { Cake, CakeBadge } from "@/lib/content/types";

type Props = {
  cake: Cake;
  badgeMap?: Map<string, CakeBadge>;
  sectionTitle?: string;
};
function refToSlug(ref?: string) {
  if (!ref) return "";
  return ref.split("/").pop()!.replace(/\.md$/i, "");
}

function formatPrice(cake: Cake) {
  const p = cake.pricing;

  if (p.type === "single") {
    if (p.price == null) return null;
    return `${p.currency === "USD" ? "$" : ""}${p.price}${p.currency === "LBP" ? " LBP" : ""}`;
  }

  const sizes = p.sizes ?? [];
  if (sizes.length === 0) return null;

  const min = Math.min(...sizes.map((s) => s.price));
  return `${p.currency === "USD" ? "$" : ""}${min}${p.currency === "LBP" ? " LBP" : ""}+`;
}

export default function CakeCard({ cake, badgeMap }: Props) {
  const { name, image, flavors = [], description, badges = [] } = cake;

  const priceLabel = formatPrice(cake);

  const waText = encodeURIComponent(`Hi! I’d like to order the "${name}" cake. Please confirm availability.`);
  const waHref = `https://wa.me/96171975948?text=${waText}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--blueberry-200)]/40 bg-gradient-to-b from-white to-[var(--blueberry-50)] shadow-[0_3px_10px_rgba(59,92,210,0.08)] hover:shadow-[0_8px_20px_rgba(59,92,210,0.12)] transition-shadow duration-300">
      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--blueberry-900)]">{name}</h3>

          {priceLabel && (
            <div className="shrink-0 rounded-full border border-[var(--blueberry-300)]/40 bg-[var(--blueberry-100)] px-3 py-1 text-sm text-[var(--blueberry-800)]">
              {priceLabel}
            </div>
          )}
        </div>

        {!!description && (
          <p className="mt-2 text-sm text-[var(--blueberry-700)]/80">
            {description}
          </p>
        )}

        {/* Badges (certifications) */}
        {badges.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-[var(--blueberry-700)]/70">
              DIETARY
            </p>
            <ul className="flex flex-wrap gap-2">
              {badges.map((raw) => {
                const slug = refToSlug(raw);
                const badge = badgeMap?.get(slug);
                const label = badge?.short || badge?.title || slug;

                return (
                  <li
                    key={raw}
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                      "bg-[var(--blueberry-100)] text-[var(--blueberry-900)]",
                      "border border-[var(--blueberry-300)]/30",
                      "text-xs font-semibold",
                    ].join(" ")}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--blueberry-600)]" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Flavors / Contains (tags) */}
        {flavors.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-[var(--blueberry-700)]/70">
              FLAVORS
            </p>
            <ul className="flex flex-wrap gap-2">
              {flavors.map((f) => (
                <li
                  key={f}
                  className={[
                    "rounded-full px-2.5 py-1 text-xs",
                    "border border-[var(--blueberry-200)]/50",
                    "bg-white/70",
                    "text-[var(--blueberry-800)]/80",
                  ].join(" ")}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-full bg-[var(--blueberry-600)] hover:bg-[var(--blueberry-700)] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow transition"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
