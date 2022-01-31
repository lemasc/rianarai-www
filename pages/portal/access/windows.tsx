import { BrandWithLogo } from "@/components/layout";
import { portalAuthGaurd } from "@/shared/insider";
import { InsiderBackEndForm } from "@/types/insider";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SmartScreen01 from "../../../public/docs/smartscreen01.png";
import SmartScreen02 from "../../../public/docs/smartscreen02.png";

export const getServerSideProps = portalAuthGaurd;

export default function PortalApp({ user }: { user: InsiderBackEndForm }) {
  return (
    <div className="my-8 flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 w-full">
      <Head>
        <title>รับสิทธิการติดตั้งแอพพลิเคชั่น: RianArai Portal</title>
      </Head>
      <div className="flex flex-col gap-4 items-center bg-white border rounded-md shadow-sm text-center p-8">
        <BrandWithLogo className="text-3xl" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-xl font-semibold">รับสิทธิการติดตั้งแอพพลิเคชั่น Windows</h1>
          <span className="text-gray-600 text-sm font-light">{user.email}</span>
        </div>
        <a
          href={"/api/download/windows"}
          className="my-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          ดาวน์โหลดโปรแกรมติดตั้ง (Setup)
        </a>
        <div className="content text-left text-sm px-4">
          <h3>ขั้นตอนการติดตั้งแอพพลิเคชั่น</h3>
          <ol>
            <li>
              <div className="content-sublist">
                ดาวน์โหลดโปรแกรมด้วย<strong>เบราวเซอร์ Google Chrome หรือ Firefox</strong>{" "}
                จากนั้นเปิดไฟล์โปรแกรมติดตั้ง
              </div>
            </li>
            <li>
              <div className="content-sublist">
                หากใช้งาน Windows ขึ้นไป ระบบอาจ
                <strong className="text-red-500">
                  แสดงหน้าจอ SmartScreen ทำให้ไม่สามารถติดตั้งได้
                </strong>{" "}
                ให้กดปุ่ม More info จากนั้นเลือก Run anyway
                <div className="flex flex-row gap-2 lg:gap-6 flex-wrap py-2">
                  <div className="max-w-xl">
                    <Image
                      width={400}
                      height={374}
                      alt="SmartScreen Windows 10 Error"
                      className="max-w-xl"
                      src={SmartScreen01}
                    />
                  </div>
                  <div className="max-w-xl">
                    <Image
                      width={400}
                      height={374}
                      alt="SmartScreen Windows 10 Error"
                      src={SmartScreen02}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="content-sublist">
                โปรแกรมจะถูกติดตั้งและเปิดขึ้นโดยอัตโนมัติเมื่อเสร็จสิ้น
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
