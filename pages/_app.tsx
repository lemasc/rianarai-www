import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
