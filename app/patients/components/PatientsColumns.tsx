"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditPatient from "./EditPatient";
import DeletePatient from "./DeletePatient";
import ViewPatientNotes from "./ViewPatientNotes";
import { FullPatient } from "@/config";
import AddNoteDialog from "@/components/AddNoteDialog";

export const columns: ColumnDef<FullPatient>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dob",
    header: "DOB"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AddNoteDialog patientId={patient.id} isTable={true} />
            <ViewPatientNotes patient={patient} />
            <EditPatient patient={patient} />
            <DeletePatient patient={patient} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
