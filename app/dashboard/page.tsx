import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import { getUsers } from "../actions/get-users";
import AppointmentsTab from "../appointments/components/AppointmentsTab";

const Dashboard = async () => {
  const appointments = await getAppointments();
  const patients = await getPatients();
  const users = await getUsers();

  return (
    <MaxWidthWrapper className="flex flex-col mt-4">
      {/* <AppointmentsTab
        appointments={appointments}
        patients={patients}
        users={users}
      /> */}
      <p>Display upcoming appointment for today</p>
      <p>Display any other information that may be useful for the user</p>

    </MaxWidthWrapper>
  );
};

export default Dashboard;
