"use client";

import { FullAppointment } from "@/config";
import EditAppointmentForm from "./EditAppointmentForm";
import { Patient, User } from "@prisma/client";
import { useState } from "react";

interface EditAppointmentProps {
  appointment: FullAppointment;
  patients: Patient[];
  users: User[];
}

const EditAppointment: React.FC<EditAppointmentProps> = ({
  appointment,
  patients,
  users,
}) => {
  const [currentAppointment, setCurrentAppointment] = useState(appointment);
  return (
    <div>
      <h1 className="font-semibold text-lg my-4">Edit Appointment</h1>
      <EditAppointmentForm
        patients={patients}
        users={users}
        currentAppointment={currentAppointment}
        setCurrentAppointment={setCurrentAppointment}
      />
    </div>
  );
};

export default EditAppointment;
