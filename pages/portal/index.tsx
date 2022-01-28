import { BrandWithLogo } from "@/components/layout";
import { withSession } from "@/shared/session";
import { InsiderBackEndForm } from "@/types/insider";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faAndroid, faApple } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  if (!context.req.session.portal?.user) {
    return {
      redirect: {
        destination: "/portal/signin",
        permanent: true,
      },
    };
  }
  return {
    props: {
      user: context.req.session.portal.user,
    },
  };
});

type Devices = {
  key: keyof InsiderBackEndForm;
  icon: any;
  name: string;
  enabled: boolean;
  code: string;
};

const devices: Devices[] = [
  {
    key: "devices_windows",
    icon: faWindows,
    name: "Windows",
    enabled: false,
    code: "windows",
  },
  {
    key: "devices_android",
    icon: faAndroid,
    name: "Android",
    enabled: true,
    code: "android",
  },
  {
    key: "devices_ios",
    icon: faApple,
    name: "Apple (iOS)",
    enabled: true,
    code: "ios",
  },
];
export default function PortalApp({ user }: { user: InsiderBackEndForm }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 w-full">
      <Head>
        <title>หน้าหลัก: RianArai Portal</title>
      </Head>
      <div className="flex flex-col gap-6 items-center bg-white border rounded-md shadow-sm text-center p-8">
        <BrandWithLogo className="text-3xl" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-xl font-semibold">
            ยินดีต้อนรับ {user.name} {user.surname}
          </h1>
          <span className="text-gray-600 text-sm font-light">{user.email}</span>
        </div>
        <h2 className="text-lg font-semibold py-2">สิทธิการดาวน์โหลดแอพพลิเคชั่น</h2>
        <div className="flex flex-row justify-center flex-wrap sm:grid grid-cols-3 gap-8 font-mono">
          {devices.map((d) => (
            <button
              key={d.key}
              className={`focus:outline-none flex flex-col gap-4 items-center rounded ${
                d.enabled ? "bg-gray-200 hover:bg-gray-300" : "opacity-50 hover:cursor-not-allowed"
              } p-4`}
              style={{ minWidth: "120px" }}
              onClick={() => router.push("/portal/access/" + d.code)}
            >
              <FontAwesomeIcon icon={d.icon} size="3x" />
              <span>{d.name}</span>
            </button>
          ))}
        </div>
        <Link href="/api/portal/signout">
          <a className="text-blue-600 hover:text-blue-800 underline text-sm">
            ออกจากระบบ RianArai Portal
          </a>
        </Link>
      </div>
    </div>
  );
}
