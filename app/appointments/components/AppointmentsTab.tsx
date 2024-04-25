"use client";

import React, { Suspense, useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { Patient, User } from "@prisma/client";
import { FullAppointment } from "@/config";
import AppointmentCard from "./AppointmentCard";
import { format } from "date-fns";

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
  const [currentAppointments, setCurrentAppointments] = useState<
    FullAppointment[]
  >([]);

  useEffect(() => {
    const dateString = format(new Date(), "M/d/yyyy");
    const filteredAppointments = appointments
      .filter((appointment) => appointment.date.includes(dateString))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
    setCurrentAppointments(filteredAppointments);
  }, [appointments]);

  return (
    <div className="w-full md:w-1/3 xl:w-2/3">
      <div>
        <div className="flex items-center justify-between my-4">
          <h2 className="font-semibold text-lg">Upcoming appointments</h2>
          <AppointmentModal
            patients={patients}
            users={users}
            setCurrentAppointments={setCurrentAppointments}
          />
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
