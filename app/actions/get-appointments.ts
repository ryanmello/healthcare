import db from "@/lib/db";

export const getAppointments = async () => {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        patient: true,
        user: true,
      },
    });
    return appointments;
  } catch (error) {
    return [];
  }
};
