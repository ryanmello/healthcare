import { FullAppointment } from "@/config";

interface AppointmentCardProps {
  appointment: FullAppointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div>
      <p>{appointment.id}</p>
    </div>
  );
};

export default AppointmentCard;
