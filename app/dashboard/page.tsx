import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateAppointmentModal from "./components/CreateAppointmentModal";
import { getAppointments } from "../actions/get-appointments";

const Dashboard = async () => {
  const appointments = await getAppointments();
  return (
    <MaxWidthWrapper className="flex mt-4">
      <div className="w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4">
            <h2 className="font-semibold">Upcoming appointments</h2>
            <CreateAppointmentModal />
          </div>
          <div className="flex flex-col space-y-2">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="w-full h-24 border-2 border-slate-700 rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
