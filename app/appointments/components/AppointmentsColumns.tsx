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
import EditAppointment from "./EditAppointment";

export const columns: ColumnDef<FullAppointment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "user.firstName",
    header: "Assigned To",
  },
  {
    accessorKey: "patient.firstName",
    header: "Patient",
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
            <EditAppointment appointment={appointment} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];