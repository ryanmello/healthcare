import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Patient } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

const DeletePatient = ({ patient }: { patient: Patient }) => {
  const handleDelete = async () => {
    try {
      await axios.post("/api/patient/delete", { patientId: patient.id });
      toast.success("Patient Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="w-28 flex items-center p-2 cursor-pointer">
            <p className="text-sm">Delete Patient</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <p className="font-semibold text-lg">Are you sure?</p>
          <p className="text-sm font-light">
            This will also delete the entire appointment history of this
            patient.
          </p>
          <p className="text-sm font-light">This cannot be undone.</p>
          <p>Patient Information:</p>
          <p className="text-sm font-light">
            {patient.firstName} {patient.lastName} - {patient.dob}
          </p>
          <DialogTrigger>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex ml-auto"
            >
              Delete
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeletePatient;
