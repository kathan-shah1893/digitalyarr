import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/project-service";

export async function GET() {
  try {
    const projects = await getAllProjects();
    const data = JSON.stringify({ projects }, null, 2);

    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="projects.json"',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
