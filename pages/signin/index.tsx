import Brand from "../../components/layout/brand";
import Head from "next/head";
export default function ClientSignIn() {
  return (
    <div className="min-h-screen flex flex-col mx-12 sm:mx-24 items-center justify-center text-center">
      <Head>
        <title>การเข้าสู่ระบบ</title>
      </Head>
      <div className="flex flex-col gap-6 items-center justify-center font-light">
        <div className="flex flex-row items-center gap-4 py-4">
          <img src="/logo.svg" width={60} height={60} />

          <Brand className="text-4xl" />
        </div>
        <h1 className="text-2xl font-medium">เข้าสู่ระบบ RianArai PC</h1>
        <span>คลิกที่ปุ่มด้านล่างเพื่อเข้าสู่ระบบด้วยบัญชี Google สำหรับเบราวเซอร์นี้</span>
        <a
          href="/signin/redirect"
          className="rounded px-4 py-2 btn bg-green-500 text-white from-green-600 to-green-600 ring-green-500"
        >
          เข้าสู่ระบบด้วย Google
        </a>
        <span className="font-medium text-red-600">
          เข้าสู่ระบบด้วยบัญชี PNRU เท่านั้น หากเข้าด้วยบัญชีอื่นระบบจะแสดงข้อผิดพลาด
        </span>
        <hr className="border-t w-full" />
        <span className="text-sm sarabun-font text-gray-500">
          Copyright &copy; 2021{new Date().getFullYear() !== 2021 && `-${new Date().getFullYear()}`}{" "}
          Lemasc Service Co.,Ltd
        </span>
      </div>
    </div>
  );
}
