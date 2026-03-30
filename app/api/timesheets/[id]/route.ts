import { NextResponse } from "next/server";

let timesheets: any[] = [];

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  timesheets = timesheets.map((item) =>
    item.id == params.id ? { ...item, ...body } : item
  );

  return NextResponse.json({ message: "Updated" });
}