import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { appointmentId } = data;

    const appointment = await db.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        archived: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log("/api/appointment/update", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
