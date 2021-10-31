import React, { useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { Menubar, Container, Footer } from "@/components/layout";
import { JoinForm, JoinTerms } from "@/components/join";
import { InsiderFrontEndForm } from "@/types/insider";

export default function InsiderJoinPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const methods = useForm<InsiderFrontEndForm>();
  const [form, setForm] = useState(false);
  const [touched, setTouched] = useState(false);
  const [memory, setMemory] = useState<boolean | undefined>(undefined);
  const [isSending, setSending] = useState(false);
  const { watch, reset, handleSubmit } = methods;

  const confirm = watch("confirm");
  const confirmRights = watch("confirmRights");

  const onSubmit = async (data: InsiderFrontEndForm) => {
    if (!data || isSending) return;
    console.log(recaptchaRef);
    const token = await recaptchaRef.current?.executeAsync();
    if (!token) return alert("ไม่สามารถยืนยันตัวตนได้");
    try {
      setSending(true);
      await axios.post("/api/register", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSending(false);
      router.replace("/insider/success");
    } catch (err) {
      console.error(err);
      setSending(false);
      alert("ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <>
      <Head>
        <title>เข้าร่วม RianArai Insider</title>
      </Head>
      <Menubar />
      <Container>
        <div style={{ minHeight: "60vh" }} className="w-full max-w-2xl">
          <Transition
            show={!form && memory === undefined}
            as="div"
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex flex-col gap-8"
            afterLeave={() => {
              if (memory !== undefined) setForm(memory);
              setMemory(undefined);
            }}
          >
            <JoinTerms />
            <button
              onClick={() => setMemory(true)}
              title="ยอมรับและดำเนินการต่อ"
              className="px-4 py-2 rounded-lg hover:bg-gray-800 bg-black text-white focus:outline-none focus:ring-2 ring-black focus:ring-offset-4 ring-offset-white"
            >
              ยอมรับและดำเนินการต่อ <ArrowRightIcon className="-mt-0.5 inline h-5 w-5" />
            </button>
          </Transition>
          <Transition
            show={form && memory === undefined}
            as="div"
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="bg-white sm:-my-6 p-8 sm:p-12 border rounded-lg shadow-lg"
            afterLeave={() => {
              if (memory !== undefined) setForm(memory);
              setMemory(undefined);
              reset();
              setTouched(false);
            }}
          >
            <FormProvider {...methods}>
              <form
                autoComplete="off"
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h1 className="font-bold text-3xl">เข้าร่วมโปรแกรม RianArai Insider</h1>
                <JoinForm touched={touched} setTouched={setTouched} />
                <div className="grid grid-cols-2 gap-4 py-4">
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => setMemory(false)}
                    title="ยกเลิกการเข้าร่วม"
                    className="px-4 py-2 rounded-lg disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-200 bg-white border-2 disabled:border-gray-200 border-gray-700 focus:outline-none focus:ring-2 ring-black focus:ring-offset-4 ring-offset-gray-100"
                  >
                    <ArrowLeftIcon className="-mt-0.5 inline h-5 w-5" /> ยกเลิก
                  </button>
                  <button
                    type="submit"
                    title={
                      confirm && confirmRights ? "เข้าร่วมโปรแกรม Insider" : "กรุณากดยืนยันข้อตกลง"
                    }
                    disabled={isSending || !(confirm && confirmRights)}
                    className="disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg hover:bg-gray-800 bg-black text-white focus:outline-none focus:ring-2 ring-black focus:ring-offset-4 ring-offset-gray-100"
                  >
                    เข้าร่วม <ArrowRightIcon className="-mt-0.5 inline h-5 w-5" />
                  </button>
                </div>
                <ReCAPTCHA
                  size="invisible"
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA as string}
                />
              </form>
            </FormProvider>
          </Transition>
        </div>
      </Container>
      <Footer />
    </>
  );
}
