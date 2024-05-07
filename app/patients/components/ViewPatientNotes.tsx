import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FullNote, FullPatient } from "@/config";
import { format } from "date-fns";
import NoteCard from "@/components/NoteCard";

const ViewPatientNotes = ({ patient }: { patient: FullPatient }) => {
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
              {patient.firstName} {patient.lastName} Notes
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="pr-4 max-h-[700px]">
            {patient.notes.map((note) => (
              // @ts-ignore
              <NoteCard key={note.id} note={note} />
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewPatientNotes;
