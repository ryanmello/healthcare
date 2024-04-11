import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "../actions/get-appointments";
import { getPatients } from "../actions/get-patients";
import PatientModal from "./components/PatientModal";
import { getUsers } from "../actions/get-users";
import { Suspense } from "react";
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
      <div className="w-full md:w-1/3">
        <div className="px-2">
          <div className="flex items-center justify-between my-4 bg-slate-800 p-2 rounded-md ring-[1px] ring-slate-700">
            <h2 className="font-semibold">Patients</h2>
            <PatientModal />
          </div>
          <Suspense>
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
          </Suspense>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
