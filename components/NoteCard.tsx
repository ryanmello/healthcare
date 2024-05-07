"use client"

import DeleteDialog from "@/components/DeleteDialog";
import EditNoteDialog from "@/components/EditNoteDialog";
import { FullNote } from "@/config";
import { format } from "date-fns";

interface NoteCardProps {
  note: FullNote;
  includeDetails: boolean;
}

const NoteCard = ({ note }: { note: FullNote }) => {
  return (
    <div
      key={note.id}
      className="border-[1px] border-slate-800 p-4 rounded-md text-sm space-y-2 mb-2"
    >
      <div className="flex justify-between items-center text-slate-400">
        <p>{format(new Date(note.createdAt), "yyyy-MM-dd HH:mm:ss")}</p>
        <p>{note.user.lastName}</p>
        <div className="flex items-center gap-4">
          <EditNoteDialog note={note} />
          <DeleteDialog id={note.id} directive="note" type="icon" />
        </div>
      </div>
      <p>{note.text}</p>
      {note.appointment && (
        <p className="text-slate-400">Appointment: {note.appointment.date}{" - "}{note.appointment.patient.firstName}{" "}{note.appointment.patient.lastName}</p>
      )}
      {note.patient && (
        <p className="text-slate-400">Patient: {note.patient.firstName}{" "}{note.patient.lastName}</p>
      )}
    </div>
  );
};

export default NoteCard;
