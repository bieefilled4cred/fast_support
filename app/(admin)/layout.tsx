import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

import { DM_Sans } from "next/font/google";
import { CSSProperties } from "react";
import AppSidebar from "@/components/sidebar";
import HeaderDropdown from "@/components/header";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import AutoLogoutWrapper from "./AutoLogoutWrapper";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const cookieStore = await cookies();
  //   const encryptedToken = cookieStore.get("fast-support-tok")?.value;

  //   if (!encryptedToken) {
  //     redirect("/login");
  //   }

  return (
    <main lang="en">
      {/* <AutoLogoutWrapper /> */}
      <div
        className={`min-h-screen grid grid-cols-1 ${dmSans.variable} antialiased vsc-initialized`}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "260px",
            } as CSSProperties
          }
        >
          <AppSidebar />
          <main className="w-full overflow-hidden">
            <div className={`${dmSans.variable} antialiased vsc-initialized`}>
              <div className="relative">
                <div className="w-full flex pb-[18px] px-4 md:px-8 my-[22px] justify-between items-center shadow_[0_-1px_0px_0px_rgba(230,230,230,1)] border-b border-[#E7E7E7]">
                  <div className="w-full flex items-center">
                    <HeaderDropdown />
                  </div>
                </div>

                <div className="bg-white">{children}</div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </main>
  );
}
