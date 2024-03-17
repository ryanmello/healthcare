import { auth, currentUser } from "@clerk/nextjs";
import SidebarBody from "./SidebarBody";
import { getUser } from "@/app/actions/get-user";
import MobileSidebar from "./MobileSidebar";

const Sidebar = async () => {
  const { userId } = auth();
  const user = await getUser({ userId });

  return (
    <aside className="h-screen">
      <nav className="hidden h-full md:flex flex-col bg-slate-900 border-r shadow-sm">
        <SidebarBody user={user} />
      </nav>
      <nav className="">
        <MobileSidebar />
      </nav>
    </aside>
  );
};

export default Sidebar;
