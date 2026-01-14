import type { ReactNode } from "react";
import Link from "next/link";
import { Leaf, Heart, ChefHat, Sparkles } from "lucide-react";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

type PhilosophyCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export default function About() {
  return (
    <>
      <NavBar />

      <main className="pt-[var(--nav-h,6.5rem)] pb-16 text-[#2c2c2c] bg-gradient-to-b from-[#fafafa] to-white">
        <section className="relative text-center px-6 py-24 md:py-32 bg-gradient-to-b from-[#fdfcfb] to-[#f5f4f2]">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Real Ingredients. Real Story.</h1>
          <p className="mt-6 max-w-2xl mx-auto text-[#555]/80 text-lg leading-relaxed">
            From pure fruits and organic cocoa to handcrafted catering, Fruits n Fluff grew from a love for honest food
            and the joy of sharing it.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-[var(--blueberry,#3b5cd2)]">Born from Real Ingredients</h2>
            <p className="text-[#444] leading-relaxed text-lg">
              Fruits n Fluff began with a simple promise, to make cakes that taste like nature intended. No
              preservatives. No artificial colors. No shortcuts.
            </p>
            <p className="mt-4 text-[#555] leading-relaxed">
              Every cake is made using real fruit juice freshly squeezed for each batch. Even the chocolate is crafted
              from 100% organic cocoa because real flavor starts from real ingredients.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] aspect-[4/3]">
            <img
              src="/about/real-ingredients.png"
              alt="Fresh natural baking ingredients including freshly squeezed orange juice, strawberries, organic cocoa beans, and dark chocolate for handmade cakes"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="bg-[#f7f6f3] py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] order-2 md:order-1 aspect-[4/3]">
              <img src="/about/glutenfree.jpeg" alt="Gluten free cake" className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-semibold mb-4 text-[#bca87c]">For Everyone, Without Compromise</h2>
              <p className="text-[#444] leading-relaxed text-lg">
                Some of our friends could not enjoy our cakes because of lactose or gluten intolerance. We took that as
                a challenge, not a limit.
              </p>
              <p className="mt-4 text-[#555] leading-relaxed">
                After months of trials and small victories, Fruits n Fluff unveiled its first gluten free, dairy free
                cakes, rich, soft, and full of flavor, just like the originals.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center py-28 px-6">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--blueberry,#3b5cd2)]">Sweet Turned Savory</h2>
          <p className="text-[#444] leading-relaxed text-lg max-w-2xl mx-auto">
            Passion does not stop at dessert. With the same homemade care and organic touch, Fruits n Fluff expanded
            into full catering, bringing balanced, handcrafted meals to every table with the same heart as our cakes.
          </p>

          <div className="mt-10 flex justify-center">
            <img
              src="/about/catering.jpg"
              alt="Elegant catering dishes"
              className="rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-w-2xl w-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="bg-[#f9f8f7] py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-12 text-[#bca87c]">Homemade, Honest, From the Heart</h2>

            <div className="grid md:grid-cols-4 gap-8">
              <PhilosophyCard
                icon={<Leaf className="text-[#bca87c]" size={30} />}
                title="100% Organic"
                desc="We use only real, certified organic ingredients. No preservatives or artificial flavors."
              />
              <PhilosophyCard
                icon={<ChefHat className="text-[#bca87c]" size={30} />}
                title="Handcrafted"
                desc="Every cake and dish is made by hand, in small batches, with care and precision."
              />
              <PhilosophyCard
                icon={<Heart className="text-[#bca87c]" size={30} />}
                title="Inclusive"
                desc="Gluten free, dairy free, and allergen conscious options crafted for everyone."
              />
              <PhilosophyCard
                icon={<Sparkles className="text-[#bca87c]" size={30} />}
                title="Authentic"
                desc="From our kitchen to yours, real food made with love, not shortcuts."
              />
            </div>
          </div>
        </section>

        <section className="text-center py-24 px-6 bg-gradient-to-t from-[#faf9f6] to-white">
          <h2 className="text-3xl font-semibold text-[#2c2c2c]">Taste the Story</h2>
          <p className="mt-3 text-[#555]/80">Discover what makes Fruits n Fluff more than just desserts.</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu/cakes"
              className="px-8 py-3 rounded-full text-white font-medium shadow transition"
              style={{ backgroundColor: "var(--blueberry,#3b5cd2)" }}
            >
              Explore Cakes
            </Link>

            <Link
              href="/menu/catering"
              className="px-8 py-3 rounded-full text-[#2c2c2c] font-medium border border-[#bca87c]/50 hover:bg-[#bca87c]/10 transition"
            >
              View Catering
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PhilosophyCard({ icon, title, desc }: PhilosophyCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-[#555] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
