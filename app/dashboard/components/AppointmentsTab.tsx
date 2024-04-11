"use client";

import React, { Suspense, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { Patient, User } from "@prisma/client";
import AppointmentCard from "./AppointmentCard";
import { FullAppointment } from "@/config";

interface AppointmentsTabProps {
  appointments: FullAppointment[];
  patients: Patient[];
  users: User[];
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments,
  patients,
  users,
}) => {
  const [currentAppointments, setCurrentAppointments] = useState(appointments);
  return (
    <div className="w-full md:w-1/3 xl:w-2/3">
      <div className="px-2">
        <div className="flex items-center justify-between my-4 bg-slate-800 p-2 rounded-md ring-[1px] ring-slate-700">
          <h2 className="font-semibold">Upcoming appointments</h2>
          <AppointmentModal patients={patients} users={users} setCurrentAppointments={setCurrentAppointments} />
        </div>
        <Suspense>
          {currentAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              patients={patients}
              users={users}
              setCurrentAppointments={setCurrentAppointments}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default AppointmentsTab;
