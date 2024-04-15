import { UserButton, auth } from "@clerk/nextjs";
import SidebarBody from "./SidebarBody";
import { getUser } from "@/app/actions/get-user";
import MobileNavbar from "./MobileNavbar";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Sidebar = async () => {
  const { userId } = auth();
  const user = await getUser({ userId });

  return (
    <aside className="md:h-screen">
      <nav className="hidden h-full md:flex flex-col bg-slate-900 border-r shadow-sm">
        <SidebarBody user={user} />
      </nav>
        <nav className="flex md:hidden items-center justify-between bg-slate-800 h-14 px-2.5">
          <MobileNavbar />
          <Image
            src={logo}
            alt="image"
            className="overflow-hidden transition-all"
            width={32}
            height={32}
          />
          <UserButton />
        </nav>
    </aside>
  );
};

export default Sidebar;
