import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-4 text-center px-6 py-10 w-full bg-gray-100">
      <span className="text-sm">Copyright &copy; 2021 Lemasc Service Co.,ltd</span>
      <div className="flex flex-row gap-8">
        <a target="_blank" rel="noreferrer" href="https://github.com/lemasc/rianarai-www">
          <FontAwesomeIcon icon={faGithub} size="2x" className="opacity-50 hover:opacity-100" />
        </a>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/lemascth">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="opacity-50 hover:opacity-100" />
        </a>
      </div>
      <div className="flex flex-row gap-8 text-sm text-gray-500">
        <Link href="/docs/privacy">
          <a className="underline">นโยบายความเป็นส่วนตัว</a>
        </Link>
      </div>
    </div>
  );
}
