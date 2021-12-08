import Brand from "./brand";
import Link from "next/link";
export default function Menubar() {
  return (
    <div className="sticky z-10 top-0 flex flex-row w-full p-6 justify-center items-center bg-black text-white">
      <Link href="/insider">
        <a title="RianArai Insider" className="flex flex-col items-center gap-2 text-center">
          <Brand landing className="text-3xl" />
          <span className="text-sm font-mono uppercase font-bold select-none">Insider Release</span>
        </a>
      </Link>
    </div>
  );
}
