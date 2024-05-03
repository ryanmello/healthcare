import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FullPatient } from "@/config";

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
          {patient.notes.map((note) => (
            <p key={note.id}>{note.id}</p>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewPatientNotes;
