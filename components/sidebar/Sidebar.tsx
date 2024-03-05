import { currentUser } from "@clerk/nextjs";
import SidebarBody from "./SidebarBody";

const Sidebar = async () => {
  const user = await currentUser();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-slate-900 border-r shadow-sm">
        <SidebarBody
          image={user?.imageUrl}
          email={user?.emailAddresses[0].emailAddress}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
