import { Button } from "@/components/ui/button";
import { FullAppointment } from "@/config";
import { Appointment } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";

const AppointmentCard = ({ appointment }: { appointment: FullAppointment }) => {
  return (
    <div className="p-2 border-2 border-slate-800 mb-2 rounded-md">
      <p>
        {appointment.patient.firstName} {appointment.patient.lastName}
      </p>
      <p>
        {appointment.user.firstName} {appointment.user.lastName}
      </p>
      <p>{appointment.date}</p>
      <Button variant="ghost">
        <Trash />
      </Button>
    </div>
  );
};

export default AppointmentCard;
