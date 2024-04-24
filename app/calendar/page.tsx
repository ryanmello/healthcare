import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CalendarComponent from './components/CalendarComponent';
import { getAppointments } from "../actions/get-appointments";

const CalendarPage = async () => {
  const appointments = await getAppointments();
  return (
    <MaxWidthWrapper>
      <CalendarComponent appointments={appointments} />
    </MaxWidthWrapper>
  );
};

export default CalendarPage;
