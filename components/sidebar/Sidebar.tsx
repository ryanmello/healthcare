import { auth, currentUser } from "@clerk/nextjs";
import SidebarBody from "./SidebarBody";
import { getDatabaseUser } from "@/app/actions/get-database-user";

const Sidebar = async () => {
  const { userId } = auth();
  const user = await getDatabaseUser({ userId });

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-slate-900 border-r shadow-sm">
        <SidebarBody user={user} />
      </nav>
    </aside>
  );
};

export default Sidebar;
