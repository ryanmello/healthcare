import { getPatients } from "../actions/get-patients";
import { PatientsTable } from "./components/PatientsTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { columns } from "./components/PatientsColumns";
import PatientsHeader from "./components/PatientsHeader";
import { FullPatient } from "@/config";

const Patients = async () => {
  const patients = await getPatients() as FullPatient[];

  return (
    <MaxWidthWrapper>
      <PatientsHeader />
      <PatientsTable columns={columns} data={patients} />
    </MaxWidthWrapper>
  );
};

export default Patients;
