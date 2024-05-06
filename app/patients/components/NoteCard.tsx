"use client"

import DeleteDialog from "@/components/DeleteDialog";
import EditNoteDialog from "@/components/EditNoteDialog";
import { FullNote } from "@/config";
import { format } from "date-fns";

const NoteCard = ({ note }: { note: FullNote }) => {
  return (
    <div
      key={note.id}
      className="border-[1px] border-slate-800 p-4 rounded-md text-sm mb-2"
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
    </div>
  );
};

export default NoteCard;
