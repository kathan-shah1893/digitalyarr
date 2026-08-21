import { NextResponse } from "next/server";
import { reorderProjects } from "@/lib/project-service";
import { z } from "zod";

const ReorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "At least one ID is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const result = ReorderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    await reorderProjects(result.data.ids);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
