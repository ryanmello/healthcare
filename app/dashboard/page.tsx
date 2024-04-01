import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AppointmentModal from "./components/AppointmentModal";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import PatientModal from "./components/PatientModal";
import { getUsers } from "../actions/get-users";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentCard from "./components/AppointmentCard";

const Dashboard = async () => {
  const appointments = await getAppointments();
  const patients = await getPatients();
  const users = await getUsers();

  return (
    <MaxWidthWrapper className="flex mt-4">
      <div className="w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4 bg-slate-700 p-2 rounded-md">
            <h2 className="font-semibold">Upcoming appointments</h2>
            <AppointmentModal patients={patients} users={users} />
          </div>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
      <div className="w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4 bg-slate-700 p-2 rounded-md">
            <h2 className="font-semibold">Patients</h2>
            <PatientModal />
          </div>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="p-2 border-2 border-slate-800 mb-2 rounded-md"
            >
              <p>
                {patient.firstName} {patient.lastName}
              </p>
              <p>{patient.email}</p>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
