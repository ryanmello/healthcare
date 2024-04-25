"use client";

import React, { Suspense, useEffect, useState } from "react";
import { FullAppointment } from "@/config";
import AppointmentCard from "./AppointmentCard";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { columns } from "./AppointmentsColumns";
import { AppointmentsTable } from "./AppointmentsTable";

interface AppointmentsTabProps {
  appointments: FullAppointment[];
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ appointments }) => {
  const [currentAppointments, setCurrentAppointments] = useState<
    FullAppointment[]
  >([]);
  const router = useRouter();

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
    <div className="w-full">
      <div className="flex items-center justify-between my-4">
        <h2 className="font-semibold text-lg">Upcoming Appointments</h2>
        <Button onClick={() => router.push("/appointments/create")}>
          <p className="font-semibold pr-1">Create Appointment</p>
          <PlusIcon size={16} />
        </Button>
      </div>
      <Suspense>
        {currentAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            setCurrentAppointments={setCurrentAppointments}
          />
        ))}
      </Suspense>
      <h2 className="font-semibold text-lg mt-8">All Appointments</h2>
      <AppointmentsTable columns={columns} data={appointments} />
    </div>
  );
};

export default AppointmentsTab;
