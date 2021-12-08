import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TypewriterComponent from "typewriter-effect";
import { Brand, Container, Footer } from "@/components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faAndroid, faApple } from "@fortawesome/free-brands-svg-icons";

export default function InsiderLandingPage() {
  return (
    <>
      <Head>
        <title>RianArai Insider Community</title>
      </Head>
      <div className="w-full select-none p-12 sm:p-16 flex flex-col bg-black text-white justify-center items-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Brand landing className="text-5xl" />
          <span className="sm:text-lg font-mono uppercase font-bold select-none">
            Insider Release
          </span>
        </div>
        <div className="flex flex-row justify-center flex-wrap sm:grid grid-cols-3 gap-8 font-mono uppercase sm:py-4">
          <div className="flex flex-col gap-4 items-center">
            <FontAwesomeIcon icon={faWindows} size="3x" />
            <span>2 Nov 21</span>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <FontAwesomeIcon icon={faAndroid} size="3x" />
            <span className="opacity-50">Coming Soon</span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FontAwesomeIcon icon={faApple} size="3x" />
            <span className="opacity-50">Coming Soon</span>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex flex-col items-center md:flex-row gap-4 lg:gap-8">
          <div className="flex flex-col gap-4 p-4 flex-grow leading-7">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg">มากกว่าแค่</span>
              <TypewriterComponent
                options={{
                  loop: true,
                  delay: 40,
                  wrapperClassName: "font-bold text-3xl",
                  cursorClassName: "text-3xl",
                  autoStart: true,
                  strings: [
                    "การเข้าเรียน Zoom",
                    "การเข้าเรียน Google Meet",
                    "การส่งงานที่ได้รับมอบหมาย",
                    "การใช้ชีวิตในแต่ละวัน",
                  ],
                }}
              />
            </div>
            <p>
              เปลี่ยนแนวคิดได้เลย นี่คือ RianArai 3.0 ที่จะไม่ใช่แค่การกดเข้าเรียนในแต่ละวัน แต่
              RianArai จะเป็นตัวช่วยในการเรียนออนไลน์ของคุณ ในการจัดการรายวิชาและเนื้อหา
              วางแผนการส่งงานในแต่ละวัน และเรียนในแต่ละวันให้มีประสิทธิภาพที่สุด
            </p>
          </div>
          <div className="flex flex-col flex-shrink-0 lg:items-end justify-center">
            <div className="flex flex-row items-center gap-4">
              <Image draggable={false} src="/logo.svg" width={50} height={50} alt="logo" />
              <Brand className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 bg-gray-100 rounded-lg px-6 py-10 xl:m-6">
          <div className="flex flex-col gap-4 p-4 flex-grow leading-7">
            <h1 className="font-bold text-3xl">ทดลองใช้งาน RianArai 3.0</h1>
            <p>
              เข้าเป็นสมาชิกของ RianArai Insider Community
              วันนี้เพื่อรับสิทธิการดาวน์โหลดแอพพลิเคชั่นเบต้า แจ้งปัญหาและข้อเสนอแนะต่าง ๆ
              เพื่อทำให้ RianArai เป็นตัวช่วยในการเรียนของทุก ๆ คน
            </p>
            <h2 className="text-xl font-medium">กำหนดการเปิดใช้งานเวอร์ชั่น Beta</h2>
            <ul className="list-disc list-inside">
              <li>PC - 2 พ.ย. 64</li>
              <li>Android และ iOS - ภายในกลางเดือน ธ.ค. 64</li>
            </ul>
          </div>
          <div className="flex flex-col flex-shrink-0 lg:items-end justify-center">
            <Link href="/insider/join">
              <a
                title="เข้าร่วม RianArai Insider Community"
                className="text-center px-4 py-2 rounded-lg hover:bg-gray-800 bg-black text-white focus:outline-none focus:ring-2 ring-black focus:ring-offset-4 ring-offset-white"
              >
                เข้าร่วม RianArai Insider Community{" "}
                <ArrowRightIcon className="-mt-0.5 inline h-5 w-5" />
              </a>
            </Link>
          </div>
        </div>

        <span className="font-light max-w-lg text-center">
          ข้อมูลภายในหน้านี้เป็นเพียงการคาดการณ์เท่านั้น และสามารถเปลี่ยนแปลงได้จากการพัฒนา
          โดยไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า
        </span>
      </Container>
      <Footer />
    </>
  );
}
