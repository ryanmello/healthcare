import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAppointments } from "./actions/get-appointments";
import { FullAppointment, FullNote } from "@/config";
import { isToday } from "date-fns";
import AppointmentCard from "@/components/AppointmentCard";
import NoteCard from "../components/NoteCard";
import { getNotes } from "./actions/get-notes";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Home() {
  const appointments = (await getAppointments()) as FullAppointment[];
  const notes = (await getNotes()) as FullNote[];

  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return isToday(appointmentDate);
  });

  return (
    <MaxWidthWrapper className="mb-12">
      <h2 className="text-2xl font-semibold my-4">Welcome back!</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <h3 className="my-4 font-medium">Upcoming Appointments</h3>
          {todayAppointments.map((app) => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
        <div className="w-full md:w-1/2 relative">
          <h3 className="my-4 font-medium">Recent Notes </h3>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
