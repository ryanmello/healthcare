import { FullNote } from "@/config";
import { format } from "date-fns";

const AppointmentNoteCard = ({ note }: { note: FullNote }) => {
  return (
    <div
      key={note.id}
      className="border-[1px] border-slate-800 p-4 rounded-md text-sm mb-2"
    >
      <div className="flex justify-between items-center text-slate-400">
        <p>{format(new Date(note.createdAt), "yyyy-MM-dd HH:mm:ss")}</p>
        <p>{note.user?.lastName}</p>
      </div>
      <p>{note.text}</p>
    </div>
  );
};

export default AppointmentNoteCard;
