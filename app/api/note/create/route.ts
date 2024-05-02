import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { text, patientId, appointmentId } = data;

    const note = await db.note.create({
      data: {
        text,
        patientId,
        appointmentId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("/api/appointment/create", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
