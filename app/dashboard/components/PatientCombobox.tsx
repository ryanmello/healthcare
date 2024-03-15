"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { RefCallBack } from "react-hook-form";
import { Patient } from "@prisma/client";

interface PatientComboboxProps {
  patients: Patient[];
  onChange: (value: string) => void;
  passedValue: string;
  disabled?: boolean;
  name: string;
  onBlur: () => void;
  ref: RefCallBack;
}

const PatientCombobox: React.FC<PatientComboboxProps> = ({
  patients,
  onChange,
  passedValue,
  disabled,
  name,
  onBlur,
  ref,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(passedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? patients.find((patient) => patient.id === value)?.firstName
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[462px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {patients.map((patient) => (
              <CommandItem
                key={patient.id}
                value={patient.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === patient.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {patient.firstName} {patient.lastName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PatientCombobox;
