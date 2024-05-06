import db from "@/lib/db";

export const getNotes = async (userId: string | undefined) => {
  try {
    const notes = await db.note.findMany({
      include: {
        user: true,
      },
    });
    return notes;
  } catch (error) {
    return [];
  }
};
