import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import { getUsers } from "../actions/get-users";
import AppointmentsTab from "./components/AppointmentsTab";

const Appointments = async () => {
  const appointments = await getAppointments();

  return (
    <MaxWidthWrapper className="flex flex-col md:flex-row">
      <AppointmentsTab
        appointments={appointments}
      />
    </MaxWidthWrapper>
  );
};

export default Appointments;
