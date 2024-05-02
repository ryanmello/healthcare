import { FullAppointment } from "@/config";
import Link from "next/link";

const EditAppointment = ({ appointment }: { appointment: FullAppointment }) => {
  return (
    <div>
      <Link href={`/appointments/${appointment.id}`} className="text-sm p-4">Edit Appointment</Link>
    </div>
  );
};

export default EditAppointment;
