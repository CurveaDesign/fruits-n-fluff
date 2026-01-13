import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "@/styles/globals.css";

function unlockScroll() {
  // Always unlock scroll on navigation (and on first mount)
  document.body.classList.remove("lock-scroll");

  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  document.documentElement.style.overflow = "";
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    unlockScroll();
    const handle = () => unlockScroll();
    router.events.on("routeChangeComplete", handle);
    router.events.on("routeChangeError", handle);
    return () => {
      router.events.off("routeChangeComplete", handle);
      router.events.off("routeChangeError", handle);
    };
  }, [router.events]);

  return (
      <Component {...pageProps} />
  );
}
