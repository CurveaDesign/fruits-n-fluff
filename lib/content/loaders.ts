import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Cake,
  CakeBadge,
  CakeSection,
  CateringSection,
  CateringItem,
  PlatDuJourWeek,
} from "./types";

const root = process.cwd();

function readDirMd(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function slugFromFilename(filename: string) {
  return filename.replace(/\.md$/, "");
}

function parseMd<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return parsed.data as T;
}

export function loadCakeSections(): CakeSection[] {
  const dir = path.join(root, "content", "cakeSections");
  return readDirMd(dir)
    .map((f) => {
      const slug = slugFromFilename(f);
      const data = parseMd<Omit<CakeSection, "slug">>(path.join(dir, f));
      return { slug, ...data };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function loadCakeBadges(): CakeBadge[] {
  const dir = path.join(root, "content", "cakeBadges");
  return readDirMd(dir).map((f) => {
    const slug = slugFromFilename(f);
    const data = parseMd<Omit<CakeBadge, "slug">>(path.join(dir, f));
    return { slug, ...data };
  });
}

export function loadCakes(): Cake[] {
  const dir = path.join(root, "content", "cakes");
  return readDirMd(dir).map((f) => {
    const slug = slugFromFilename(f);
    const data = parseMd<Omit<Cake, "slug">>(path.join(dir, f));
    return { slug, ...data };
  });
}

export function loadCateringSections(): CateringSection[] {
  const dir = path.join(root, "content", "cateringSections");
  return readDirMd(dir)
    .map((f) => {
      const slug = slugFromFilename(f);
      const data = parseMd<Omit<CateringSection, "slug">>(path.join(dir, f));
      return { slug, ...data };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function loadCateringItems(): CateringItem[] {
  const dir = path.join(root, "content", "cateringItems");
  return readDirMd(dir).map((f) => {
    const slug = slugFromFilename(f);
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const parsed = matter(raw);

    const data = parsed.data as Omit<CateringItem, "slug" | "description">;
    const body = String(parsed.content || "").trim();

    return {
      slug,
      ...data,
      ...(body ? { description: body } : {}),
    };
  });
}

export function loadPlatDuJourWeeks(): PlatDuJourWeek[] {
  const dir = path.join(root, "content", "platDuJourWeeks");

  return readDirMd(dir).map((f) => {
    const slug = slugFromFilename(f);
    const data = parseMd<any>(path.join(dir, f));

    return {
      slug,
      ...data,
      // ✅ force Date -> string (and keep strings as-is)
      weekStart:
        data?.weekStart instanceof Date
          ? data.weekStart.toISOString().slice(0, 10)
          : String(data?.weekStart || ""),
    } as PlatDuJourWeek;
  });
}
