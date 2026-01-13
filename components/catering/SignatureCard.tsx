import { MessageCircle } from "lucide-react";

export type CateringItem = {
  name: string;
  price?: string | number;
  description?: string;
  image?: string;
};

type Props = {
  item: CateringItem;
  accent?: string;
};

export default function SignatureCard({ item, accent = "#bca87c" }: Props) {
  const { name, price, description, image } = item || ({} as CateringItem);
  const waHref = `https://wa.me/96171975948?text=${encodeURIComponent(
    `Hello! I’d like to inquire about "${name}" from your catering menu.`
  )}`;

  return (
    <article className="rounded-2xl overflow-hidden border border-[rgba(188,168,124,0.15)] bg-white/90 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-[#2c2c2c]">{name}</h3>
          {price != null && <span className="text-[#bca87c] font-medium">${price}</span>}
        </div>
        {description && <p className="mt-2 text-sm text-[#555] leading-relaxed">{description}</p>}

        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white font-medium"
          style={{ backgroundColor: accent }}
        >
          <MessageCircle size={16} />
          Inquire
        </a>
      </div>
    </article>
  );
}
