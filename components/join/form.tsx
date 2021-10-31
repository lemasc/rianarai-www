import { UseFormRegister, useFormContext } from "react-hook-form";
import { InsiderFrontEndForm } from "@/types/insider";

type Register = UseFormRegister<InsiderFrontEndForm>;

export function InputWithError({
  name,
  options,
}: {
  name: Parameters<Register>[0];
  options: Parameters<Register>[1];
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <input autoComplete="off" {...register(name, options)} />
      {errors && errors[name] && (
        <span className="text-red-600 text-sm font-medium">{errors[name].message}</span>
      )}
    </div>
  );
}

export default function JoinForm({
  touched,
  setTouched,
}: {
  touched: boolean;
  setTouched: (touched: boolean) => void;
}) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<InsiderFrontEndForm>();

  const triggerDevices = () => {
    if (Object.keys(errors).length > 0 || touched) {
      setTimeout(() => trigger("devices"));
      setTouched(true);
    }
  };
  return (
    <>
      <div className="form-container md:pt-4">
        <label>ชื่อ:</label>
        <InputWithError
          name="name"
          options={{
            required: {
              value: true,
              message: "กรุณากรอก",
            },
            pattern: {
              value: /^[ก-๛]+$/,
              message: "กรุณากรอกเป็นภาษาไทยและไม่มีเว้นวรรค",
            },
          }}
        />
        <label>นามสกุล:</label>
        <InputWithError
          name="surname"
          options={{
            required: {
              value: true,
              message: "กรุณากรอก",
            },
            pattern: {
              value: /^[ก-๛]+$/,
              message: "กรุณากรอกเป็นภาษาไทยและไม่มีเว้นวรรค",
            },
          }}
        />
        <label>อีเมล (PNRU เท่านั้น):</label>
        <InputWithError
          name="email"
          options={{
            required: {
              value: true,
              message: "กรุณากรอก",
            },
            pattern: {
              value: /(^[0-9]{5})@(wpm.pnru.ac.th)$/,
              message: "กรุณาตรวจสอบรูปแบบอีเมล (เช่น 12345@wpm.pnru.ac.th)",
            },
          }}
        />

        <label className="text-center sm:text-left">
          อุปกรณ์ที่ใช้งานแอพพลิเคชั่น:
          <br />
          (เลือกได้หลายตัวเลือก)
        </label>
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <div className="flex flex-col gap-1 w-max">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                {...register("devices.windows", {
                  onChange: () => triggerDevices(),
                })}
              />
              <label>Windows</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                {...register("devices.android", {
                  onChange: () => triggerDevices(),
                })}
              />
              <label>Android</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                {...register("devices.ios", {
                  onChange: () => triggerDevices(),
                })}
              />
              <label>iOS</label>
            </div>
            {register("devices", {
              validate: (devices) =>
                Object.values(devices).reduce((prev, cur) => cur || !!prev, false),
            }) && null}
          </div>

          {errors && errors["devices"] && (
            <span className="text-red-600 text-sm font-medium">กรุณาเลือกอย่างน้อย 1 อุปกรณ์</span>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          {...register("confirm", {
            required: true,
          })}
        />
        <label className="text-sm sm:text-base">
          ฉันยอมรับว่าข้อมูลทั้งหมดที่กรอกข้างต้นนั้นเป็นความจริง
        </label>
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          {...register("confirmRights", {
            required: true,
          })}
        />
        <label className="text-sm sm:text-base">
          ฉันยอมรับว่าแอพพลิเคชั่นและบริการที่ได้รับจาก RianArai Insider เป็นกรรมสิทธิ์ของ RianArai
          และจะไม่นำไปเผยแพร่ ทำซ้ำ ดัดแปลง แก้ไข ไม่ว่าส่วนใดส่วนหนึ่งหรือทั้งหมดโดยไม่ได้รับอนุญาต
        </label>
      </div>
    </>
  );
}
