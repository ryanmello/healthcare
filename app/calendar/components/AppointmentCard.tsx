"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FullAppointment } from "@/config";
import axios from "axios";
import { Check, Pencil, PersonStandingIcon, Trash } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { Patient, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import EditAppointmentForm from "@/app/appointments/components/EditAppointmentForm";

interface AppointmentCardProps {
  appointment: FullAppointment;
  patients: Patient[];
  users: User[];
  setCurrentAppointments: Dispatch<SetStateAction<FullAppointment[]>>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  patients,
  users,
  setCurrentAppointments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(appointment);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const appointmentId = appointment.id;
      setCurrentAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== appointmentId)
      );
      await axios.post("/api/appointment/delete", { appointmentId });
      toast.success("Appointment deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleComplete = async () => {
    try {
      const appointmentId = appointment.id;
      setCurrentAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== appointmentId)
      );
      await axios.post("/api/appointment/update/archive", { appointmentId });
      toast.success("Appointment completed");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  let startDate = new Date(appointment.date);
  let endDate = new Date(startDate.getTime() + appointment.duration * 60000);
  let startTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let endTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let formattedAppointmentTime = `${startTime} - ${endTime}`;
  let formattedDate = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="p-4 border-2 border-slate-800 mb-2 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{formattedAppointmentTime}</p>
          <p className="font-light text-slate-400">{formattedDate}</p>
        </div>
        {currentAppointment.patient.image ? (
          <Image src={currentAppointment.patient.image} alt="Image" />
        ) : (
          <PersonStandingIcon />
        )}
      </div>
      <Separator className="my-2" />
      <p className="font-medium">
        Assigned to: {currentAppointment.patient.firstName}{" "}
        {currentAppointment.patient.lastName}
      </p>
      <p className="font-light text-slate-400">
        Patient: {currentAppointment.user.firstName}{" "}
        {currentAppointment.user.lastName}
      </p>
      <Separator className="my-2" />
      <p className="font-light text-slate-400">
        {currentAppointment.description}
      </p>
      <Separator className="my-2" />

      <Dialog>
        <DialogTrigger>
          <Button
            variant="ghost"
            className="space-x-2 border-[1px] border-slate-700 rounded-md mr-2"
          >
            <p className="font-semibold">Edit</p>
            <Pencil size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <EditAppointmentForm
            patients={patients}
            users={users}
            currentAppointment={currentAppointment}
            setCurrentAppointment={setCurrentAppointment}
          />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="ghost"
            className="space-x-2 border-[1px] border-slate-700 rounded-md mr-2"
          >
            <p className="font-semibold">Delete</p>
            <Trash size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p>Are you sure?</p>
          <DialogTrigger className="w-full flex">
            <Button
              variant="destructive"
              className="w-1/3 ml-auto"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="ghost"
            className="space-x-2 border-[1px] border-slate-700 rounded-md"
          >
            <p className="font-semibold">Complete</p>
            <Check size={14} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p className="w-2/3">
            Are you sure you want to mark this appointment as completed?
          </p>
          <DialogTrigger className="w-full flex">
            <Button className="w-1/3 ml-auto" onClick={handleComplete}>
              Confirm
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCard;
