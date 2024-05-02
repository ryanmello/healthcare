import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { noteId } = data;

    const note = await db.note.delete({
      where: {
        id: noteId,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log("/api/appointment/delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
