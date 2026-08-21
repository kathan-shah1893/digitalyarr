import { NextResponse } from "next/server";
import { ProjectsDataSchema } from "@/lib/validation/project-schema";
import { replaceAllProjects } from "@/lib/project-service";

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const result = ProjectsDataSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed — the JSON contains invalid project data.",
          details: result.error.flatten(),
          issues: result.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    await replaceAllProjects(result.data.projects);

    return NextResponse.json({
      success: true,
      count: result.data.projects.length,
      message: `Successfully saved ${result.data.projects.length} project(s).`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Import failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
