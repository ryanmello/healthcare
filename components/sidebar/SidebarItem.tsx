"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  route: string;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  text,
  route,
  expanded,
}) => {
  const [active, setActive] = useState(false);
  const path = usePathname();
  return (
    <li
      className={cn(
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors",
        path == route
          ? "bg-gradient-to-tr from-slate-600 to bg-slate-700"
          : "hover:bg-slate-700 text-slate-300"
      )}
      onClick={() => setActive(!active)}
    >
      <Icon />
      <span className={cn(expanded ? "w-52 pl-3" : "hidden")}>{text}</span>
    </li>
  );
};

export default SidebarItem;
