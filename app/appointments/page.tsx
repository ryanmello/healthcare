import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "../actions/get-appointments";
import AppointmentsTab from "./components/AppointmentsTab";
import { FullAppointment } from "@/config";

const Appointments = async () => {
  const appointments = await getAppointments() as FullAppointment[];

  return (
    <MaxWidthWrapper className="flex flex-col md:flex-row">
      <AppointmentsTab appointments={appointments} />
    </MaxWidthWrapper>
  );
};

export default Appointments;