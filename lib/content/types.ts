export type Pricing =
  | {
      type: "single";
      currency: "USD" | "LBP";
      price?: number;
    }
  | {
      type: "by_size";
      currency: "USD" | "LBP";
      sizes?: { label: string; price: number }[];
    };

export type SeasonalWindow = {
  start?: string; // MM-DD
  end?: string;   // MM-DD
};

export type CakeSection = {
  slug: string;        // filename
  title: string;
  order: number;
  description?: string;
};

export type CakeBadge = {
  slug: string;        // filename
  title: string;
  short?: string;
};

export type Cake = {
  slug: string;        // filename
  name: string;
  image: string;       // /uploads/...
  section: string;     // reference -> cakeSections slug
  badges?: string[];   // reference -> cakeBadges slug[]
  flavors?: string[];
  description?: string;
  pricing: Pricing;
  seasonal?: SeasonalWindow;
};
