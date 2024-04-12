import { Appointment, Patient, User } from "@prisma/client";

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
