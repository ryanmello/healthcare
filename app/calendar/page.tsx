import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CalendarComponent from './components/CalendarComponent';
import { getAppointments } from "../actions/get-appointments";
import { getUsers } from "../actions/get-users";
import { getPatients } from "../actions/get-patients";

const CalendarPage = async () => {
  const appointments = await getAppointments();
  const users = await getUsers();
  const patients = await getPatients();
  return (
    <MaxWidthWrapper>
      <CalendarComponent appointments={appointments} users={users} patients={patients} />
    </MaxWidthWrapper>
  );
};

export default CalendarPage;
