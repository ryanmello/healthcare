import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, dob, gender, address } = data;

    const patient = await db.patient.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        address,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.log("/api/patient/create", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
