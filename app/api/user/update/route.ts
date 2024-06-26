import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, firstName, lastName, phone, role, image } = data;

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        phone,
        role,
        image,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("/api/user/update", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
