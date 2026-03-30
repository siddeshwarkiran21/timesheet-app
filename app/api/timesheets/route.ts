import { NextResponse } from "next/server";

let timesheets: any[] = [
  {
    id: 1,
    week: "Week 1",
    date: "2026-03-25",
    status: "Pending",
  },
];

export async function GET() {
  return NextResponse.json(timesheets);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newItem = {
    id: Date.now(),
    ...body,
  };

  timesheets.push(newItem);

  return NextResponse.json(newItem);
}