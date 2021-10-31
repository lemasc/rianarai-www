import { ReactNode } from "react";
import { useRouter } from "next/router";

export default function Container({ children }: { children: ReactNode | ReactNode[] }) {
  const router = useRouter();
  return (
    <main
      className={
        "p-8 sm:p-12 lg:p-16 flex flex-col items-center gap-16 max-w-7xl" +
        (router?.pathname === "/insider" ? " md:p-24" : "")
      }
    >
      {children}
    </main>
  );
}
