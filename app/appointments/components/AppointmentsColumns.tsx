"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FullAppointment } from "@/config";
import Link from "next/link";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import AddAppointmentNote from "./AddAppointmentNote";
import ViewAppointmentNotes from "./ViewAppointmentNotes";

export const columns: ColumnDef<FullAppointment>[] = [
  {
    id: "date",
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "userLastName",
    accessorKey: "user.lastName",
    header: "Assigned To",
  },
  {
    id: "patientFirstName",
    accessorKey: "patient.firstName",
    header: "P-FName",
  },
  {
    id: "patientLastName",
    accessorKey: "patient.lastName",
    header: "P-LName",
  },
  {
    id: "patientEmail",
    accessorKey: "patient.email",
    header: "P-Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col">
            <AddAppointmentNote appointmentId={appointment.id} />
            <ViewAppointmentNotes appointment={appointment} />
            <Link
              href={`/appointments/${appointment.id}`}
              className="text-sm px-2 my-2">
              Edit Appointment
            </Link>
            <DeleteAppointmentModal appointment={appointment} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
