import { NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validation/project-schema";
import { getAllProjects, createProject } from "@/lib/project-service";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to load projects: ${String(err)}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const created = await createProject(result.data);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const message = String(err);
    const status = message.includes("already exists") || message.includes("already in use") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
