import Head from "next/head";
import NotFound from "@/components/screens/NotFound";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 | Fruits n Fluff</title>
      </Head>
      <NotFound />
    </>
  );
}
