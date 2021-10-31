export default function Brand({ className, landing }: { className: string; landing?: boolean }) {
  return (
    <h1 className={`${className} header-font select-none`}>
      <span className={landing ? "text-white" : "text-red-500"}>เรียน</span>
      <span className={landing ? "text-white" : "text-purple-500"}>อะไร</span>
      {landing && <span className="text-lg pl-2">3.0</span>}
    </h1>
  );
}
