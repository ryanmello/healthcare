import { getPatients } from "@/app/actions/get-patients";
import { getUsers } from "@/app/actions/get-users";
import CreateAppointmentForm from "./components/CreateAppointmentForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const CreateAppointment = async () => {
  const patients = await getPatients();
  const users = await getUsers();
  return (
    <MaxWidthWrapper>
      <h1 className="text-lg font-semibold my-4 w-1/3">Create Appointment</h1>
      <CreateAppointmentForm patients={patients} users={users} />
    </MaxWidthWrapper>
  );
};

export default CreateAppointment;
