"use client";

import {
  BarChart3,
  ChevronFirst,
  ChevronLast,
  CircleUserRound,
  HomeIcon,
  LayoutDashboard,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";

const SidebarBody = ({
  image,
  email,
}: {
  image: string | undefined;
  email: string | undefined;
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="p-4 pb-2 flex justify-between items-center">
        <Image
          src={logo}
          alt="image"
          className={cn(
            "overflow-hidden transition-all",
            expanded ? "w-6" : "w-0"
          )}
          width={32}
          height={32}
        />
        <button onClick={() => setExpanded(!expanded)} className={cn("flex items-center justify-center", !expanded && "w-full")}>
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <ul className="flex-1 px-3 mt-2">
        <SidebarItem
          icon={HomeIcon}
          text="Home"
          route="/"
          expanded={expanded}
        />
        <SidebarItem
          icon={LayoutDashboard}
          text="Dashboard"
          route="/dashboard"
          expanded={expanded}
        />
        <SidebarItem
          icon={BarChart3}
          text="Statistics"
          route="/statistics"
          expanded={expanded}
        />
        <SidebarItem
          icon={CircleUserRound}
          text="Users"
          route="/users"
          expanded={expanded}
        />
      </ul>
      <div className="flex justify-between items-center border-t border-slate-700 p-4">
        <div className="flex items-center">
          {image != undefined && (
            <Image
              src={image}
              alt="image"
              className="w-10 h-10 rounded-md"
              height={100}
              width={100}
            />
          )}
          <div className={cn("flex flex-col justify-center leading-4 cursor-default ml-2", !expanded && "hidden")}>
            <h4 className="font-semibold">John Doe</h4>
            <span className="text-xs text-slate-500">{email}</span>
          </div>
        </div>
        <MoreVertical
          size={20}
          className={cn("cursor-pointer", !expanded && "hidden")}
        />
      </div>
    </>
  );
};

export default SidebarBody;
