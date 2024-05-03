import { getUser } from "@/app/actions/get-user";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { text, patientId, appointmentId } = data;

    const { userId } = auth();
    const user = await getUser({ userId });
    if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

    const note = await db.note.create({
      data: {
        text,
        patientId,
        appointmentId,
        userId: user.id,
      } as {
        text: string;
        patientId?: string;
        appointmentId?: string;
        userId: string;
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("/api/note/create", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
