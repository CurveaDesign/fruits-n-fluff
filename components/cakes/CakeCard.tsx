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

function parseMMDD(mmdd?: string): { m: number; d: number } | null {
  if (!mmdd) return null;
  const parts = mmdd.split("-");
  if (parts.length !== 2) return null;
  const m = Number(parts[0]);
  const d = Number(parts[1]);
  if (!Number.isFinite(m) || !Number.isFinite(d)) return null;
  return { m, d };
}

function toDayOfYear(m: number, d: number) {
  // Use a fixed non-leap year so comparison is stable
  const dt = new Date(2001, m - 1, d, 12, 0, 0);
  const start = new Date(2001, 0, 1, 12, 0, 0);
  const diff = dt.getTime() - start.getTime();
  return Math.floor(diff / 86400000) + 1;
}

function isInSeason(seasonal?: { start?: string; end?: string }): boolean {
  // If no seasonal window is provided, treat as in-season (not seasonal)
  if (!seasonal?.start || !seasonal?.end) return true;

  const s = parseMMDD(seasonal.start);
  const e = parseMMDD(seasonal.end);
  if (!s || !e) return true;

  const start = toDayOfYear(s.m, s.d);
  const end = toDayOfYear(e.m, e.d);

  const now = new Date();
  const nowDoy = toDayOfYear(now.getMonth() + 1, now.getDate());

  // Normal range (e.g. 06-01 to 09-30)
  if (start <= end) return nowDoy >= start && nowDoy <= end;

  // Wrap-around range (e.g. 11-15 to 02-15)
  return nowDoy >= start || nowDoy <= end;
}

function formatPrice(cake: Cake) {
  const p = cake.pricing as any;

  if (p.type === "single") {
    if (p.price == null) return null;
    return `${p.currency === "USD" ? "$" : ""}${p.price}${p.currency === "LBP" ? " LBP" : ""}`;
  }

  if (p.type === "by_size") {
    const sizes = p.sizes ?? [];
    if (sizes.length === 0) return null;

    const vals = sizes.map((s: any) => s.price).filter((n: any) => typeof n === "number");
    if (vals.length === 0) return null;

    const min = Math.min(...vals);
    const max = Math.max(...vals);

    const prefix = p.currency === "USD" ? "$" : "";
    const suffix = p.currency === "LBP" ? " LBP" : "";

    return min === max ? `${prefix}${min}${suffix}` : `${prefix}${min} – ${prefix}${max}${suffix}`;
  }

  return null;
}

export default function CakeCard({ cake, badgeMap }: Props) {
  const { name, image, flavors = [], description, badges = [] } = cake;

  const priceLabel = formatPrice(cake);

  const hasSeasonWindow = !!(cake as any).seasonal?.start && !!(cake as any).seasonal?.end;
  const inSeason = hasSeasonWindow ? isInSeason((cake as any).seasonal) : true;
  const outOfSeason = hasSeasonWindow && !inSeason;

  const sizes =
    (cake as any).pricing?.type === "by_size" ? ((cake as any).pricing?.sizes ?? []) : [];

  const waText = encodeURIComponent(
    outOfSeason
      ? `Hi! I’m interested in the "${name}" cake. It looks seasonal — can you please confirm availability?`
      : `Hi! I’d like to order the "${name}" cake. Please confirm availability.`
  );
  const waHref = `https://wa.me/96171975948?text=${waText}`;

  const ctaLabel = outOfSeason ? "Ask for availability" : "Order on WhatsApp";

  return (
<article
  className={[
    "group relative overflow-hidden rounded-2xl border border-[var(--blueberry-200)]/40",
    "bg-gradient-to-b from-white to-[var(--blueberry-50)]",
    "shadow-[0_3px_10px_rgba(59,92,210,0.08)] transition-shadow duration-300",
    "hover:shadow-[0_8px_20px_rgba(59,92,210,0.12)]",
  ].join(" ")}
>

      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative">
        <img
          src={image}
          alt={name}
          className={[
            "h-full w-full object-cover transition-transform duration-500",
            outOfSeason ? "" : "group-hover:scale-105",
          ].join(" ")}
          loading="lazy"
        />

        {outOfSeason && (
          <div className="absolute left-3 top-3 rounded-full border border-black/10 bg-white/80 backdrop-blur px-3 py-1 text-[11px] font-semibold text-black/70">
            Seasonal • Back Soon
          </div>
        )}
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
          <p className="mt-2 text-sm text-[var(--blueberry-700)]/80">{description}</p>
        )}

        {outOfSeason && (
          <p className="mt-2 text-xs text-[var(--blueberry-700)]/80">
            Back Soon — Ask for Availability
          </p>
        )}

        {/* Sizes (when by_size) */}
        {sizes.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-[var(--blueberry-700)]/70">
              SIZES
            </p>
            <ul className="flex flex-wrap gap-2">
              {sizes.map((s: any) => (
                <li
                  key={s.label}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-2.5 py-1",
                    "border border-[var(--blueberry-200)]/60 bg-white/70",
                    "text-xs font-semibold text-[var(--blueberry-800)]/85",
                  ].join(" ")}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--blueberry-600)]" />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
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
            className={[
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold",
              "shadow-sm hover:shadow transition w-full",
              outOfSeason
                ? "bg-white text-[var(--blueberry-800)] border border-[var(--blueberry-300)]/60 hover:bg-[var(--blueberry-50)]"
                : "bg-[var(--blueberry-600)] hover:bg-[var(--blueberry-700)] text-white",
            ].join(" ")}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
