import { getAppointmentById } from "@/app/actions/get-appointment-by-id";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EditAppointment from "./components/EditAppointment";
import { getPatients } from "@/app/actions/get-patients";
import { getUsers } from "@/app/actions/get-users";

const AppointmentId = async ({
  params,
}: {
  params: { appointmentId: string };
}) => {
  const { appointmentId } = params;
  const appointment = await getAppointmentById(appointmentId);
  const patients = await getPatients();
  const users = await getUsers();

  return (
    <MaxWidthWrapper>
      {appointment != null ? (
        <EditAppointment
          appointment={appointment}
          patients={patients}
          users={users}
        />
      ) : (
        <div>
          <p>Appointment not found</p>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default AppointmentId;
