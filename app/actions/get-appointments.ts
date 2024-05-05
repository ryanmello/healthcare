import db from "@/lib/db";

export const getAppointments = async () => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        archived: false,
      },
      include: {
        patient: true,
        user: true,
        note: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            // @ts-ignore
            user: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return appointments;
  } catch (error) {
    return [];
  }
};
