import Link from "next/link";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function CateringMenu() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen pt-[var(--nav-h,6.5rem)] bg-gradient-to-b from-[#f8f7f4] to-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/70 backdrop-blur">
            Catering Menu
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-[#2f2f2f]">
            Coming Soon
          </h1>

          <p className="mt-5 text-lg text-black/60 leading-relaxed">
            We’re finishing the catering section to match the same premium level as the cake menu. If you need catering
            now, message us and we’ll guide you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/96171975948"
              target="_blank"
              rel="noopener"
              className="rounded-2xl px-6 py-3 text-base font-medium text-white"
              style={{ backgroundColor: "var(--blueberry,#3b5cd2)" }}
            >
              Contact on WhatsApp
            </a>

            <Link
              href="/menu/cakes"
              className="rounded-2xl px-6 py-3 text-base font-medium border border-black/10 bg-white/70 backdrop-blur"
            >
              Browse Cakes Menu
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
