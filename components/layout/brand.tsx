import Image from "next/image";

type BrandProps = { className: string; landing?: boolean };
export function Brand({ className, landing }: BrandProps) {
  return (
    <h1 className={`${className} header-font select-none`}>
      <span className={landing ? "text-white" : "text-red-500"}>เรียน</span>
      <span className={landing ? "text-white" : "text-purple-500"}>อะไร</span>
      {landing && <span className="text-lg pl-2">3.0</span>}
    </h1>
  );
}

export function BrandWithLogo(props: BrandProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Image draggable={false} src="/logo.svg" width={50} height={50} alt="logo" />
      <Brand {...props} />
    </div>
  );
}
