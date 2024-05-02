import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { noteId, text, appointmentId, patientId } = data;

    const note = await db.note.update({
      where: {
        id: noteId,
      },
      data: {
        text,
        patientId,
        appointmentId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("/api/appointment/update", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
