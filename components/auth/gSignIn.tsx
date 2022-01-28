import { useRouter } from "next/router";
import Image from "next/image";

export default function GoogleSignInComponent() {
  const router = useRouter();
  return (
    <>
      {router.query.error && (
        <span className="font-normal text-red-600 mb-4">
          การเข้าสู่ระบบล้มเหลว กรุณาเข้าสู่ระบบใหม่อีกครั้ง
        </span>
      )}
      <button
        onClick={() => {
          router.push("/api/portal/signin");
        }}
        title="Sign in with Google"
        className="text-gray-600 flex flex-row justify-center items-center gap-2 px-4 py-3 w-full border shadow rounded hover:bg-gray-100 bg-gray-50"
      >
        <Image alt="Google" width={20} height={20} src="/google.svg" />
        <span className="ml-4 -pt-1">Sign in with Google</span>
      </button>
      <span className="text-gray-600 font-light text-sm">
        ใช้บัญชีที่ได้ลงทะเบียนไว้กับ RianArai Insider (PNRU) เท่านั้น
      </span>
    </>
  );
}
