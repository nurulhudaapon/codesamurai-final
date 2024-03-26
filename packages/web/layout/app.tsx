"use client";

import { navigations } from "@/routes/navigation";
import AppLogo from "../assets/ecosync.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const checkActive = (path: string) => {
    if (pathName.startsWith(path)) {
      return "bg-green400";
    }
  };
  return (
    <div className="flex overflow-hidden">
      <div className="bg-green300 w-[300px] h-screen">
        <div className="flex justify-center py-10">
          <AppLogo />
        </div>
        <div className="divide-y-[1px] divide-green-400">
          {navigations.map(({ icon: Icon, key, label, path }, index) => (
            <Link
              href={path}
              className={
                "flex items-center py-5 text-white px-[40px] hover:bg-green400 cursor-pointer " +
                checkActive(path)
              }
              key={key}
            >
              <Icon />
              <span className="ml-3">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-screen overflow-auto">{children}</div>
    </div>
  );
};
