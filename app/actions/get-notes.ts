import db from "@/lib/db";

export const getNotes = async () => {
  try {
    const notes = await db.note.findMany({
      include: {
        patient: true,
        appointment: {
          include: {
            patient: true,
            user: true,
            notes: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return notes;
  } catch (error) {
    return [];
  }
};
