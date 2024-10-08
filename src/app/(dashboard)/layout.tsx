import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-screen flex overflow-hidden`}>
      {/* Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p--4 overflow-x-hidden overflow-scroll">
        <div className="p-4 sticky top-0 bg-white">
          <Link
            href={"/"}
            className="w-full flex justify-center lg:justify-start items-center gap-2"
          >
            <Image src={"/logo.png"} alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold"> School Suite </span>
          </Link>
        </div>
        <div className="p-4">
          <Menu />
        </div>
      </div>
      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-x-hidden overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
