import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    const note = await db.note.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("/api/note/delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
