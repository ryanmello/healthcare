"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FullAppointment } from "@/config";
import axios from "axios";
import { Check, Pencil, PersonStandingIcon, PlusIcon, Trash, EyeIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/router";
import AppointmentNoteCard from "./AppointmentNoteCard";

interface AppointmentCardProps {
  appointment: FullAppointment;
  setCurrentAppointments: Dispatch<SetStateAction<FullAppointment[]>>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  setCurrentAppointments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(appointment);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(appointment.notes || []);
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

  const handleAddNote = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/note/create', {
        appointmentId: appointment.id,
        text: noteText
      });
      setNotes([...notes, response.data]);
      setNoteText("");
      toast.success('Note added successfully!');
    } catch (error) {
      toast.error('Failed to add note.');
    }
  };

  const handleViewNotes = async () => {
    try {
      const response = await axios.get(`/api/note?appointmentId=${appointment.id}`);
      setNotes(response.data);
    } catch (error) {
      toast.error('Failed to load notes.');
    }
  };

  let startDate = new Date(appointment.date);
  let endDate = new Date(startDate.getTime() + appointment.duration * 60000);
  let startTime = startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  let endTime = endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
        {currentAppointment.patient.image ? (
          <Image src={currentAppointment.patient.image} alt="Patient Image" />
        ) : (
          <PersonStandingIcon />
        )}
      </div>
      <Separator className="my-2" />
      <p className="font-semibold">
        {currentAppointment.patient.firstName} {currentAppointment.patient.lastName}
      </p>
      <p className="font-light text-slate-400">
        {currentAppointment.user.firstName} {currentAppointment.user.lastName}
      </p>
      <p className="font-light text-slate-400">
        {currentAppointment.description}
      </p>
      <Separator className="my-2" />
      <div className="space-x-2">
        <Button
          variant="ghost"
          className="border-[1px] border-slate-700 rounded-md"
          onClick={() => router.push(`/appointments/${appointment.id}`)}
        >
          <Pencil size={14} /> <span>Edit</span>
        </Button>
        <Button
          variant="ghost"
          className="border-[1px] border-slate-700 rounded-md"
          onClick={() => {
            setNoteText('');
            handleViewNotes();
          }}
        >
          <EyeIcon size={14} /> <span>View Notes</span>
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" className="border-[1px] border-slate-700 rounded-md">
              <PlusIcon size={14} /> <span>Add Note</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddNote}>
              <Input value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Type your note here..." />
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AppointmentCard;
