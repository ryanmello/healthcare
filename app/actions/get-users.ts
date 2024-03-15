import db from "@/lib/db";

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};
