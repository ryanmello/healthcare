import { Patient, User } from "@prisma/client";
import {
  Calendar,
  CircleUserRound,
  HomeIcon,
  LayoutDashboard,
  ContactIcon,
  CalendarCheck,
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
    label: "Appointments",
    href: "/appointments",
    icon: CalendarCheck,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
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
