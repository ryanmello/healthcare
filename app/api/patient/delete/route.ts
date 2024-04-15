import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { patientId } = data;

    await db.appointment.deleteMany({
      where: {
        patientId: patientId,
      },
    });

    const patient = await db.patient.delete({
      where: {
        id: patientId,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.log("/api/patient/delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
