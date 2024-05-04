import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FullNote, FullAppointment } from "@/config";
import AppointmentNoteCard from "./AppointmentNoteCard";
import { format } from "date-fns";

const ViewAppointmentNotes = ({
  appointment,
}: {
  appointment: FullAppointment;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="w-28 flex items-center p-2 cursor-pointer">
            <p className="text-sm">View Notes</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Appointment on{" "}
              {format(new Date(appointment.date), "yyyy-MM-dd HH:mm")} Notes
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="pr-4 max-h-[700px]">
            <h3>Notes:</h3>
            {appointment.notes.map((note) => (
              //@ts-ignore
              <AppointmentNoteCard key={note.id} note={note} />
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewAppointmentNotes;
