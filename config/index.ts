import { Appointment, Patient, User } from "@prisma/client";

export const MOBILE_NAV_LINKS = [
  {
    label: "HOME",
    href: "/",
  },
  {
    label: "ABOUT",
    href: "/about",
  },
  {
    label: "SCHEDULE",
    href: "/schedule",
  },
  {
    label: "TICKETS",
    href: "/tickets",
  },
  {
    label: "SHOP",
    href: "/shop",
  },
];

export type FullAppointment = {
  id: string;
  date: string;
  description: string;
  user: User;
  userId: string;
  patient: Patient;
  patientId: string;
};
