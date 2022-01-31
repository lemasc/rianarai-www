import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TypewriterComponent from "typewriter-effect";
import { BrandWithLogo, Container, Footer } from "@/components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";

type StoreImage = {
  id: string;
  title: string;
};

const images: StoreImage[] = [
  {
    id: "google-play",
    title: "Get it on Google Play",
  },
  {
    id: "testflight",
    title: "Available on Apple TestFlight",
  },
  {
    id: "windows",
    title: "Download on Windows",
  },
];

function VideoOrImageBg() {
  const videoRef = useRef<HTMLVideoElement | null>();
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = "/hero/hero.mp4";
    }
  }, []);
  return (
    <video
      className="w-full h-full object-cover"
      poster="/hero/hero.jpg"
      ref={(ref) => (videoRef.current = ref)}
      id="hero-bg"
      autoPlay
      muted
      loop
      playsInline
    ></video>
  );
}
export default function InsiderLandingPage() {
  return (
    <>
      <Head>
        <title>RianArai Insider Community</title>
      </Head>
      <div className="w-full relative select-none text-center">
        <VideoOrImageBg />
        <div className="absolute inset-0 bg-gray-800 opacity-50 z-10"></div>
        <div className="p-12 sm:p-16 absolute inset-0 z-20 flex flex-col text-white gap-8 w-full items-center justify-center ">
          <div className="flex flex-col items-center gap-6 text-center">
            <BrandWithLogo landing className="text-5xl" imageSize={65} />
            <span className="sm:text-md select-none opacity-75">
              เครื่องมือเดียวสำหรับการเรียนออนไลน์และออนไซต์
            </span>
          </div>
          <span className="text-xl">
            พร้อมใช้งานแล้วในทุกแพลตฟอร์ม ผ่านโปรแกรม RianArai Insider
          </span>
          <div className="flex flex-row gap-6 flex-wrap items-center justify-center">
            {images.map((i) => (
              <Image
                key={i.title}
                draggable={false}
                src={`/store-badges/${i.id}.png`}
                height={80}
                width={207}
                alt={i.title}
                title={i.title}
              />
            ))}
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
            <BrandWithLogo className="text-3xl" />
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
            <p>
              RianArai รองรับการใช้งานจากทั้ง 3 แพลตฟอร์ม Windows, Android และ iOS
              <br />
              ขั้นตอนทั้งหมดใช้เวลาไม่เกิน 10 นาทีก็สามารถเริ่มต้นได้ทันที{" "}
            </p>
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
