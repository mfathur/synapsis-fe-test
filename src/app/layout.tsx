import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import NavBarMobile from "@/components/NavBarMobile";
import SideBar from "@/components/SideBar";
import MarginWidthWrapper from "@/components/MarginWidthWrapper";
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synapsis Frontend Engineer Test",
  description: "Developed by Muhammad Fathurrohman",
  icons: {
    icon: "./../../public/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="flex">
          <SideBar />
          <main className="flex-1">
            <NavBarMobile />
            <PageWrapper>{children}</PageWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
