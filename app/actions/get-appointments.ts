import db from "@/lib/db";

export const getAppointments = async () => {
  try {
    const appointments = await db.appointment.findMany();
    return appointments;
  } catch (error) {
    return [];
  }
};
