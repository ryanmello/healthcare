"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FullAppointment } from "@/config";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AppointmentCard = ({ appointment }: { appointment: FullAppointment }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const appointmentId = appointment.id;
      await axios.post("/api/appointment/delete", { appointmentId });
      toast.success("Appointment deleted");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

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
        <Pencil size={18} />
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost">
            <Trash size={18} />
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
    </div>
  );
};

export default AppointmentCard;
