"use client";
// import "./globals.css";
// import "./data-tables-css.css";
// import "./satoshi.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SpeedDialTooltipOpen from "@/components/SpeedDial";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import { checkIsPublicRoute } from "@/utils/check-is-public-route";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const pathname = usePathname();

  const isPublicRoute = checkIsPublicRoute(pathname);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {isPublicRoute && (
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      )}
      {!isPublicRoute &&
        (loading ? (
          <div className="flex h-screen items-center justify-center bg-white">
            <LoaderSun />
          </div>
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                  <SpeedDialTooltipOpen opened />
                </div>
              </main>
            </div>
          </div>
        ))}
    </div>
  );
}
