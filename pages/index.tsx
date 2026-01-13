import Head from "next/head";
import dynamic from "next/dynamic";
const Story = dynamic(() => import("@/components/story/Story"), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fruits n Fluff — Organic & Gluten-Free Cakes, Catering & Plat du Jour | Lebanon</title>
      </Head>
      <div className="min-h-screen bg-white text-neutral-900">
        <main>
          <Story />
        </main>
      </div>
    </>
  );
}
