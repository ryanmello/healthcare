import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { patientId, userId, date, description } = data;

    const appointment = await db.appointment.create({
      data: {
        patientId,
        userId,
        date,
        description,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log("/api/appointment/create", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
