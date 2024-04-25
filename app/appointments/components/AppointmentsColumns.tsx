"use client";

import { Patient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FullAppointment } from "@/config";

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
];