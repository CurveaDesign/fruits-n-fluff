import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { LucideIcon } from "lucide-react";
import { Cake, UtensilsCrossed, Info, MessageCircle } from "lucide-react";

type Item =
  | { type: "route"; to: string; label: string; Icon: LucideIcon }
  | { type: "href"; to: string; label: string; Icon: LucideIcon };

const ITEMS: Item[] = [
  { type: "route", to: "/menu/cakes", label: "Cakes", Icon: Cake },
  { type: "route", to: "/menu/catering", label: "Catering", Icon: UtensilsCrossed },
  { type: "route", to: "/about", label: "About", Icon: Info },
  { type: "href", to: "https://wa.me/96171975948", label: "Order", Icon: MessageCircle },
];

export default function Dock() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const router = useRouter();
  const pathname = router.asPath.split("?")[0] || "/";

  return (
    <nav
      aria-label="Primary"
      className={[
        "relative z-[71] flex items-center justify-center gap-7 h-24 px-10 rounded-full",
        "backdrop-blur-2xl bg-white/65 border border-white/50",
        "shadow-[0_10px_35px_rgba(0,0,0,0.15)]",
        "before:absolute before:inset-0 before:rounded-full before:pointer-events-none",
        "before:shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
      ].join(" ")}
      onMouseLeave={() => setHoverIdx(null)}
    >
      {ITEMS.map(({ type, to, label, Icon }, i) => {
        const isRoute = type === "route";
        const active = isRoute ? pathname.startsWith(to) : false;

        const d = hoverIdx == null ? 99 : Math.abs(hoverIdx - i);
        const scale = hoverIdx == null ? 1 : d === 0 ? 1.2 : d === 1 ? 1.1 : 1;

        const content = (
          <>
            <span
              className={[
                "absolute w-14 h-14 rounded-full -z-10",
                "bg-[radial-gradient(closest-side,rgba(59,92,210,0.22),rgba(59,92,210,0)_70%)]",
                active || hoverIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-75",
                "transition-all duration-200 ease-out",
              ].join(" ")}
            />

            <div
              className={[
                "relative flex items-center justify-center w-16 h-16 rounded-2xl",
                "transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                "hover:bg-black/5",
                "outline outline-1 outline-[rgba(0,0,0,0.04)]",
              ].join(" ")}
              style={{ transform: `scale(${scale})` }}
            >
              <span
                className={[
                  "absolute top-16 px-2 py-1 rounded-md text-xs font-medium",
                  "bg-black/75 text-white/95 backdrop-blur",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-150",
                  "whitespace-nowrap",
                ].join(" ")}
              >
                {label}
              </span>

              <Icon
                size={26}
                strokeWidth={2}
                className={[
                  active ? "text-black" : "text-black/70 group-hover:text-black",
                  "transition-colors",
                ].join(" ")}
              />
            </div>
          </>
        );

        if (isRoute) {
          return (
            <Link
              key={to}
              href={to}
              aria-label={label}
              className="group relative flex items-center justify-center"
              onMouseEnter={() => setHoverIdx(i)}
            >
              {content}
            </Link>
          );
        }

        return (
          <a
            key={to}
            href={to}
            target="_blank"
            rel="noopener"
            aria-label={label}
            className="group relative flex items-center justify-center"
            onMouseEnter={() => setHoverIdx(i)}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
