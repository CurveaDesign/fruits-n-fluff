import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/brand/fnf-icon-512.png" />

        <meta
          name="description"
          content="Fruits n Fluff crafts fluffy organic cakes (with gluten-free options) and warm homemade catering & plat du jour. Order cakes, explore menus, or request private catering."
        />
        <meta
          name="keywords"
          content="organic cakes, gluten-free cakes, fruity cakes, catering, plat du jour, Lebanon, homemade desserts, Curvea Design"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Fruits n Fluff — Organic & Gluten-Free Cakes, Catering & Plat du Jour" />
        <meta
          property="og:description"
          content="Fluffy organic cakes & warm savory catering. Seasonal signatures, all-year favorites, and daily plat du jour."
        />
        <meta property="og:image" content="/brand/fruits-n-fluff-logo.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fruits n Fluff — Cakes & Catering" />
        <meta name="twitter:description" content="Organic cakes • Gluten-free • Catering & plat du jour." />
        <meta name="twitter:image" content="/brand/fruits-n-fluff-logo.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Playfair+Display:wght@500;600&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "Fruits n Fluff",
              image: "/brand/fruits-n-fluff-logo.png",
              servesCuisine: ["Desserts", "Bakery", "Gluten Free", "Home Cooking"],
              url: "/",
              description: "Organic fruity cakes with gluten-free options, plus catering & plat du jour.",
              areaServed: "Lebanon",
              sameAs: [],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
