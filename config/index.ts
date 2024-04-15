import { Patient, User } from "@prisma/client";
import {
  Calendar,
  CircleUserRound,
  HomeIcon,
  LayoutDashboard,
  ContactIcon,
} from "lucide-react";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    href: "/patients",
    icon: CircleUserRound,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    label: "Users",
    href: "/users",
    icon: ContactIcon,
  },
];

export const MOBILE_NAV_LINKS = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "DASHBOARD",
    href: "/dashboard",
  },
  {
    label: "PATIENTS",
    href: "/patients",
  },
  {
    label: "CALENDAR",
    href: "/calendar",
  },
  {
    label: "USERS",
    href: "/users",
  },
];

export type FullAppointment = {
  id: string;
  date: string;
  description: string;
  duration: number;
  user: User;
  userId: string;
  patient: Patient;
  patientId: string;
};
