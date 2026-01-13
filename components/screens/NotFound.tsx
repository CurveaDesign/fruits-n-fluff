import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
        <Link href="/" className="underline">
          Go home
        </Link>
      </div>
    </div>
  );
}
