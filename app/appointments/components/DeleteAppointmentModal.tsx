import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FullAppointment } from "@/config";
import axios from "axios";
import { toast } from "sonner";

const DeleteAppointmentModal = ({
  appointment,
}: {
  appointment: FullAppointment;
}) => {
  const handleDelete = async () => {
    try {
      await axios.post("/api/appointment/delete", {
        appointmentId: appointment.id,
      });
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
          <p className="text-sm font-light">This cannot be undone.</p>
          <p>Appointment Information:</p>
          <p className="text-sm font-light">
            {appointment.date} - {appointment.patient.firstName}{" "}
            {appointment.patient.lastName}
          </p>
          <p className="text-sm font-light">
            Assigned To: {appointment.user.firstName}{" "}
            {appointment.user.lastName}
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

export default DeleteAppointmentModal;
