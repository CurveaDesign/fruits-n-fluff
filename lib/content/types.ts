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

export type CateringSection = {
  slug: string; // filename
  title: string;
  order: number;
  description?: string;
};

export type CateringItem = {
  slug: string; // filename
  isActive: boolean;
  name: string;
  sectionRef: string; // reference -> cateringSections slug
  image?: string; // /uploads/... (PageCMS) OR missing
  priceLabel?: string; // label string
  order: number;
  description?: string; // can be body content
};

export type PlatDuJourDayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type PlatDuJourDay = {
  day: PlatDuJourDayName;
  isSet: boolean;
  name?: string;
  description?: string;
  image?: string;
  priceLabel?: string;
};

export type PlatDuJourWeek = {
  slug: string; // filename
  isActive: boolean;
  weekStart: string; // YYYY-MM-DD
  note?: string;
  days: PlatDuJourDay[];
};
