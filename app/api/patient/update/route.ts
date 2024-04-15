import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      patientId,
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      address,
    } = data;

    const user = await db.patient.update({
      where: {
        id: patientId,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        address,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("/api/user/update", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
