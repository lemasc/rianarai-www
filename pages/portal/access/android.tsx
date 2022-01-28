import { BrandWithLogo } from "@/components/layout";
import { withSession } from "@/shared/session";
import { InsiderBackEndForm } from "@/types/insider";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

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

export default function PortalApp({ user }: { user: InsiderBackEndForm }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 w-full">
      <Head>
        <title>รับสิทธิการติดตั้งแอพพลิเคชั่น: RianArai Portal</title>
      </Head>
      <div className="flex flex-col gap-4 items-center bg-white border rounded-md shadow-sm text-center p-8">
        <BrandWithLogo className="text-3xl" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-xl font-semibold">รับสิทธิการติดตั้งแอพพลิเคชั่น Android</h1>
          <span className="text-gray-600 text-sm font-light">{user.email}</span>
        </div>
        <a
          href={process.env.NEXT_PUBLIC_ANDROID_JOIN}
          target="_blank"
          rel="noreferrer noopener"
          className="my-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          ดาวน์โหลดแอพพลิเคชั่นที่ Google Play
        </a>
        <div className="content text-left text-sm px-4">
          <h3>ขั้นตอนการดาวน์โหลดแอพพลิเคชั่น</h3>
          <ol>
            <li>
              <div className="content-sublist">
                คลิกที่ปุ่มด้านบนเพื่อไปยังหน้าการเข้าร่วมแอพพลิเคชั่น Google Play
              </div>
            </li>
            <li>
              <div className="content-sublist">เลือกบัญชีในการดาวน์โหลดเป็นบัญชี PNRU</div>
            </li>
            <li>
              <div className="content-sublist">
                คลิกที่ปุ่ม <strong>ร่วมเป็นผู้ทดสอบ / Join Testing</strong>
              </div>
            </li>
            <li>
              <div className="content-sublist">
                จะได้รับลิงก์การดาวน์โหลด ให้เลือก <strong>ดาวน์โหลดใน Google Play</strong>
              </div>
            </li>
            <li>
              <div className="content-sublist">
                ติดตั้งและเปิดแอพพลิเคชั่นจาก Google Play ได้ทันที
              </div>
            </li>
          </ol>
        </div>

        <Link href="/portal">
          <a className="text-blue-600 hover:text-blue-800 underline text-sm py-2">
            กลับไปยัง RianArai Portal
          </a>
        </Link>
      </div>
    </div>
  );
}
