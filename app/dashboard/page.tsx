import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateAppointmentModal from "./components/CreateAppointmentModal";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import CreatePatientModal from "./components/CreatePatientModal";

const Dashboard = async () => {
  const appointments = await getAppointments();
  const patients = await getPatients();

  return (
    <MaxWidthWrapper className="flex mt-4">
      <div className="w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4 bg-slate-700 p-2 rounded-md">
            <h2 className="font-semibold">Upcoming appointments</h2>
            <CreateAppointmentModal patients={patients} />
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4 bg-slate-700 p-2 rounded-md">
            <h2 className="font-semibold">Patients</h2>
            <CreatePatientModal />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
