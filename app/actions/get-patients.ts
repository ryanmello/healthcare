import db from "@/lib/db";

export const getPatients = async () => {
  try {
    const patients = await db.patient.findMany({
      include: {
        notes: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            // @ts-ignore
            user: true,
          }
        },
      },
    });
    return patients;
  } catch (error) {
    return [];
  }
};
