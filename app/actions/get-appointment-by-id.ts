import db from "@/lib/db";

export const getAppointmentById = async (appointmentId: string) => {
  try {
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
        user: true,
        note: true,
      },
    });
    return appointment;
  } catch (error) {
    return null;
  }
};
