import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Patient } from "@prisma/client";
import { Pencil } from "lucide-react";

const EditPatient = ({ patient }: { patient: Patient }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex items-center p-2 space-x-2 cursor-pointer">
            <p className="text-sm">Edit Patient</p>
            <Pencil size={14} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <p>HEY!</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPatient;
