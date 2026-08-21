import { NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validation/project-schema";
import {
  getProjectById,
  updateProject,
  deleteProject,
  duplicateProject,
} from "@/lib/project-service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const result = ProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateProject(id, result.data);
    return NextResponse.json(updated);
  } catch (err) {
    const message = String(err);
    const status = message.includes("not found") ? 404 : message.includes("already in use") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<Record<string, unknown>>;

    // Handle duplicate action
    if (body.action === "duplicate") {
      const copy = await duplicateProject(id);
      return NextResponse.json(copy, { status: 201 });
    }

    // Partial update — only validate provided fields
    const updated = await updateProject(id, body as Parameters<typeof updateProject>[1]);
    return NextResponse.json(updated);
  } catch (err) {
    const message = String(err);
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = String(err);
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
