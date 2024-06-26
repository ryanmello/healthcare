"use client";

import {
  ChevronFirst,
  ChevronLast,
  CircleUserRound,
  HomeIcon,
  LayoutDashboard,
  MoreVertical,
  Settings,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";
import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { NAV_LINKS } from "@/config";

const SidebarBody = ({ user }: { user: User | null }) => {
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();

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
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex items-center justify-center",
            !expanded && "w-full"
          )}
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className={cn("px-3 mt-2", !expanded && "px-5")}>
          {NAV_LINKS.map((link, index) => (
            <SidebarItem
              key={index}
              icon={link.icon}
              text={link.label}
              route={link.href}
              expanded={expanded}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center border-t border-slate-700 p-4">
        <div className={cn("flex items-center", !expanded && "px-3")}>
          <UserButton />
          <div
            className={cn(
              "flex flex-col justify-center leading-4 cursor-default ml-2",
              !expanded && "hidden"
            )}
          >
            <h4 className="font-semibold">
              {user?.firstName} {user?.lastName}
            </h4>
            <span className="text-xs text-slate-500">{user?.email}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical
              size={20}
              className={cn("cursor-pointer", !expanded && "hidden")}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default SidebarBody;
