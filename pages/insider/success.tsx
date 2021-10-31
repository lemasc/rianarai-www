import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Menubar, Container, Footer } from "@/components/layout";
import { withSession } from "@/shared/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLine } from "@fortawesome/free-brands-svg-icons";

const QRCode = dynamic(() => import("react-qr-code"), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  const code: string | undefined = context.req.session.get("code");
  if (!code) {
    return {
      redirect: {
        destination: "/insider/",
        permanent: true,
      },
    };
  }
  context.req.session.destroy();
  await context.req.session.save();
  return {
    props: {
      code,
    },
  };
});

export default function InsiderSuccess({ code }: { code: string }) {
  return (
    <>
      <Head>
        <title>เข้าร่วม RianArai Insider สำเร็จ</title>
      </Head>
      <Menubar />
      <Container>
        <div className="flex flex-col gap-8 items-center text-center">
          <h1 className="font-bold text-3xl">เข้าร่วมโปรแกรมเรียบร้อยแล้ว!</h1>
          <span>
            เหลือขั้นตอนสุดท้ายในการเข้าสู่โปรแกรม RianArai Insider ให้เข้าสู่กลุ่ม LINE OpenChat
            โดยใช้รหัสดังต่อไปนี้
          </span>
          <div className="flex flex-col md:grid grid-cols-2 md:divide-x items-center">
            <div className="flex flex-col gap-6 text-center p-10 md:p-16 border-t md:border-t-0">
              <span className="font-bold text-xl">รหัสการเข้าร่วมของคุณ:</span>
              <div className="select-all font-mono text-2xl bg-gray-100 rounded p-4 border shadow-lg">
                {code}
              </div>
              <span className="text-red-500 font-medium">
                รหัสจะถูกแสดงครั้งเดียวเท่านั้น หากรหัสนี้สูญหาย
                คุณจำเป็นจะต้องกรอกแบบฟอร์มเข้าร่วมใหม่อีกครั้ง
              </span>
            </div>
            <div className="flex items-center justify-center flex-col gap-6 text-center">
              <div className="flex flex-col gap-4">
                <span className="font-bold text-xl">LINE OpenChat</span>
                <span>RianArai Insider Community</span>
              </div>
              <QRCode
                size={192}
                value={process.env.NEXT_PUBLIC_GROUP_LINK + "&utm_medium=link_copy"}
              />

              <a
                href={process.env.NEXT_PUBLIC_GROUP_LINK + "&utm_medium=link_copy"}
                target="_blank"
                rel="noreferrer noopener"
                className="px-12 py-2 rounded bg-line-500 hover:bg-line-600 text-white flex items-center justify-center roboto-font"
              >
                <FontAwesomeIcon icon={faLine} size="2x" className="mr-3" /> Open In LINE
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
