import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { appointmentId } = data;

    const appointment = await db.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    await db.note.deleteMany({
      where: {
        appointmentId: appointmentId,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log("/api/appointment/delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
