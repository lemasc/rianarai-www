import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/content.css";

import smoothscroll from "smoothscroll-polyfill";

import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
