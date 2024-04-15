import { ColumnDef } from "@tanstack/react-table";
import { getPatients } from "../actions/get-patients";
import { PatientsTable } from "./components/PatientsTable";
import { Patient } from "@prisma/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { columns } from "./components/PatientsColumns";

const Patients = async () => {
  const patients = await getPatients();

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between my-6">
        <h1 className="font-semibold text-lg">Patients Table</h1>
        <Button className="flex items-center space-x-2">
          <p className="font-bold text-sm">Add Patient</p>
          <PlusIcon size={16} />
        </Button>
      </div>
      <PatientsTable columns={columns} data={patients} />
    </MaxWidthWrapper>
  );
};

export default Patients;
