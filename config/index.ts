import { Appointment, Note, Patient, User } from "@prisma/client";
import {
  Calendar,
  CircleUserRound,
  HomeIcon,
  LayoutDashboard,
  AlarmClockCheck,
} from "lucide-react";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Patients",
    href: "/patients",
    icon: CircleUserRound,
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: AlarmClockCheck,
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

export type FullPatient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  dob: string;
  gender: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
};

export type FullNote = {
  id: string;
  text: string;
  patientId: string | null;
  // patient: Patient;
  appointmentId: string | null;
  // appointment: Appointment;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
