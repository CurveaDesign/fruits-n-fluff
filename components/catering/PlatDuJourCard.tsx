import { MessageCircle } from "lucide-react";

export type PlatItem = {
  name: string;
  description?: string;
  price?: string | number;
  image?: string;
};

type Props = {
  day: string;
  item: PlatItem | null;
  isPast: boolean;
  isToday: boolean;
  accent?: string;
};

export default function PlatDuJourCard({ day, item, isPast, isToday, accent = "#bca87c" }: Props) {
  const waHref = item
    ? `https://wa.me/96171975948?text=${encodeURIComponent(
        `Hello! I’d like to order the ${item.name} (${day} Plat du Jour).`
      )}`
    : null;

  return (
    <article
      className={[
        "rounded-2xl overflow-hidden border bg-white/80 backdrop-blur-md transition-all shadow-sm",
        isToday ? "shadow-[0_4px_18px_rgba(188,168,124,0.25)]" : "",
        isPast ? "opacity-50 grayscale" : "",
      ].join(" ")}
      style={{ borderColor: isToday ? accent : "rgba(188,168,124,0.15)" }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item?.image || "/catering/placeholder.jpg"}
          alt={item?.name || "Dish"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <p
          className={["text-sm font-medium uppercase tracking-wide", isToday ? "" : "text-[#888]"].join(" ")}
          style={{ color: isToday ? accent : undefined }}
        >
          {day}
        </p>

        {item ? (
          <>
            <h3 className="text-lg font-semibold text-[#2c2c2c] mt-1">{item.name}</h3>
            <p className="text-sm text-[#555] mt-1 line-clamp-2">{item.description}</p>
            {String(item.price ?? "") !== "0" && item.price != null && (
              <p className="mt-2 text-sm font-medium" style={{ color: accent }}>
                ${item.price}
              </p>
            )}

            <div className="mt-3">
              <a
                href={waHref ?? "#"}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white font-medium"
                style={{ backgroundColor: accent }}
              >
                <MessageCircle size={16} />
                Order
              </a>
            </div>
          </>
        ) : (
          <p className="text-sm text-[#777] mt-2">No menu set for this day.</p>
        )}
      </div>
    </article>
  );
}
