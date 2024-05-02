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

export const columns: ColumnDef<FullAppointment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "user.lastName",
    header: "Assigned To",
  },
  {
    accessorKey: "patient.firstName",
    header: "P-FName",
  },
  {
    accessorKey: "patient.lastName",
    header: "P-LName",
  },
  {
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
          <DropdownMenuContent align="end">
            <Link
              href={`/appointments/${appointment.id}`}
              className="text-sm px-2"
            >
              Edit Appointment
            </Link>
            <DeleteAppointmentModal appointment={appointment} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
