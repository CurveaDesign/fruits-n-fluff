import { useEffect, useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PlatDuJourCard from "@/components/catering/PlatDuJourCard";
import SignatureCard from "@/components/catering/SignatureCard";

const ACCENT = "#bca87c"; // champagne gold

export default function CateringMenu() {
  const [platDuJour, setPlatDuJour] = useState([]);
  const [mainItems, setMainItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJSON(url) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];
        const data = await res.json();
        return data.items || [];
      } catch {
        return [];
      }
    }

    Promise.all([
      loadJSON("/data/catering-platdujour.json"),
      loadJSON("/data/catering-main.json"),
    ]).then(([pdj, main]) => {
      setPlatDuJour(pdj);
      setMainItems(main);
      setLoading(false);
    });
  }, []);

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayIndex = days.indexOf(today);

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-[#f8f7f4] to-white pt-[var(--nav-h,6.5rem)]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-[#2f2f2f]">
              Catering Menu
            </h1>
            <p className="mt-3 text-[#555]/80">
              Sophisticated flavors crafted with passion — explore our weekly & signature dishes.
            </p>
          </header>

          {loading ? (
            <div className="text-center text-[#777] py-20">Loading menu...</div>
          ) : (
            <>
              {/* Plat du Jour — Weekly Calendar */}
              <section className="mb-20">
                <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: ACCENT }}>
                  Plat du Jour — This Week
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {days.map((day, idx) => {
                    const item = platDuJour.find((i) => i.day === day);
                    const isPast = idx < todayIndex;
                    const isToday = idx === todayIndex;
                    return (
                      <PlatDuJourCard
                        key={day}
                        day={day}
                        item={item}
                        isPast={isPast}
                        isToday={isToday}
                        accent={ACCENT}
                      />
                    );
                  })}
                </div>
              </section>

              {/* Signature Dishes */}
              <section>
                <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: ACCENT }}>
                  Signature Dishes
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {mainItems.map((item) => (
                    <SignatureCard key={item.id} item={item} accent={ACCENT} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
