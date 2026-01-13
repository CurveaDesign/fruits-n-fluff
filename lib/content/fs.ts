import fs from "fs";
import path from "path";

export function readDirSafe(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function contentPath(...parts: string[]) {
  return path.join(process.cwd(), "content", ...parts);
}

export function readFileUtf8(p: string) {
  return fs.readFileSync(p, "utf8");
}
