import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import { getUsers } from "../actions/get-users";
import AppointmentsTab from "./components/AppointmentsTab";

const Dashboard = async () => {
  const appointments = await getAppointments();
  const patients = await getPatients();
  const users = await getUsers();

  return (
    <MaxWidthWrapper className="flex flex-col md:flex-row mt-4">
      <AppointmentsTab
        appointments={appointments}
        patients={patients}
        users={users}
      />
    </MaxWidthWrapper>
  );
};

export default Dashboard;
