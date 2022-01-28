import GoogleSignInComponent from "@/components/auth/gSignIn";
import { BrandWithLogo } from "@/components/layout";
import Head from "next/head";

export default function PortalSignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 w-full">
      <Head>
        <title>เข้าสู่ระบบ Portal</title>
      </Head>
      <div className="flex flex-col gap-6 items-center bg-white border rounded-md shadow-sm text-center p-8">
        <BrandWithLogo className="text-3xl" />
        <h1 className="text-xl font-semibold">เข้าสู่ระบบ Portal</h1>
        <GoogleSignInComponent />
      </div>
    </div>
  );
}
