import db from "@/lib/db";

export const getUser = async ({
  userId,
}: {
  userId: string | undefined | null;
}) => {
  try {
    if (userId == undefined || userId == null) return null;

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
