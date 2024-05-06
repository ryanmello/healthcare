"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FullAppointment } from "@/config";
import axios from "axios";
import {
  Pencil,
  PersonStandingIcon,
  EyeIcon,
  Trash,
  Check,
} from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoteCard from "@/app/patients/components/NoteCard";
import AddNoteDialog from "./AddNoteDialog";

interface AppointmentCardProps {
  appointment: FullAppointment;
  setCurrentAppointments?: Dispatch<SetStateAction<FullAppointment[]>>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  setCurrentAppointments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const appointmentId = appointment.id;

      {
        setCurrentAppointments &&
          setCurrentAppointments((prevAppointments) =>
            prevAppointments.filter((app) => app.id !== appointmentId)
          );
      }
      await axios.post("/api/appointment/delete", { appointmentId });
      toast.success("Appointment deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleComplete = async () => {
    try {
      const appointmentId = appointment.id;
      {
        setCurrentAppointments &&
          setCurrentAppointments((prevAppointments) =>
            prevAppointments.filter((app) => app.id !== appointmentId)
          );
      }
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
          <p className="font-semibold">{formattedAppointmentTime}</p>
          <p className="font-light text-slate-400">{formattedDate}</p>
        </div>
        {appointment.patient.image ? (
          <Image src={appointment.patient.image} alt="Patient Image" />
        ) : (
          <PersonStandingIcon />
        )}
      </div>
      <Separator className="my-2" />
      <p className="font-semibold">
        {appointment.patient.firstName} {appointment.patient.lastName}
      </p>
      <p className="font-light text-slate-400">
        {appointment.user.firstName} {appointment.user.lastName}
      </p>
      <p className="font-light text-slate-400">{appointment.description}</p>
      <Separator className="my-2" />
      <div className="space-x-2">
        <Button
          variant="ghost"
          className="border-[1px] border-slate-700 rounded-md space-x-2"
          onClick={() => router.push(`/appointments/${appointment.id}`)}
        >
          <Pencil size={14} />
          <p className="font-semibold">Edit</p>
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button
              variant="ghost"
              className="space-x-2 border-[1px] border-slate-700 rounded-md"
            >
              <Trash size={14} />
              <p className="font-semibold">Delete</p>
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
              <Check size={14} />
              <p className="font-semibold">Complete</p>
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
        <Dialog>
          <DialogTrigger>
            <Button
              variant="ghost"
              className="border-[1px] border-slate-700 rounded-md space-x-2"
            >
              <EyeIcon size={14} />
              <p className="font-semibold">View Notes</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Notes</DialogTitle>
            </DialogHeader>
            <ScrollArea className="pr-4 max-h-[700px]">
              {appointment.notes.map((note) => (
                // @ts-ignore
                <NoteCard key={note.id} note={note} />
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <AddNoteDialog appointmentId={appointment.id} isTable={false} />
      </div>
    </div>
  );
};

export default AppointmentCard;
