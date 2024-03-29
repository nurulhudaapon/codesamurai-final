"use client";

import { navigations } from "@/routes/navigation";
import AppLogo from "../assets/ecosync.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { useSession } from "next-auth/react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  const permissions = session.data?.permissions as string[];

  const pathName = usePathname();

  const checkActive = (path: string) => {
    if (pathName.startsWith(path)) {
      return "bg-green500";
    }
  };

  const permittedNavigations = navigations.filter((n) =>
    n.require_permissions.some((p) => permissions?.includes(p))
  );

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="bg-green300 w-[400px] h-screen">
        <div className="flex justify-center py-10">
          <AppLogo />
        </div>
        <div className="divide-y-[1px] divide-green-400">
          {permittedNavigations.map(
            ({ icon: NavIcon, key, label, path, subNavigations }, index) => (
              <div>
                <Link
                  href={path}
                  className={
                    "flex items-center justify-between py-5 text-white px-[40px] bg-green400 hover:bg-green500 cursor-pointer " +
                    checkActive(path)
                  }
                  key={key}
                >
                  <div className="flex items-center gap-3">
                    <NavIcon />
                    <span>{label}</span>
                  </div>
                  {subNavigations && <Icon name="ChevronDown" />}
                </Link>
                {subNavigations?.map(
                  ({ icon: Icon, key, label, path }, index) => (
                    <Link
                      href={path}
                      className={
                        "flex border-t-[1px] border-green-400 items-center py-5 text-white pr-[40px] pl-[75px] bg-green400 hover:bg-green500 cursor-pointer " +
                        checkActive(path)
                      }
                      key={key}
                    >
                      <Icon />
                      <span className="ml-3">{label}</span>
                    </Link>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div className="h-screen w-full overflow-y-auto overflow-x-hidden py-10 px-5">
        {children}
      </div>
    </div>
  );
};
