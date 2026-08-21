import { promises as fs } from "fs";
import path from "path";
import { ProjectsDataSchema, type Project } from "./validation/project-schema";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

export async function readProjectsFile(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    const result = ProjectsDataSchema.safeParse(parsed);
    if (!result.success) {
      console.error("[ProjectRepository] Validation errors:", result.error.issues);
      return [];
    }
    return result.data.projects;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    console.error("[ProjectRepository] Failed to read projects.json:", err);
    return [];
  }
}

export async function writeProjectsFile(projects: Project[]): Promise<void> {
  const data = JSON.stringify({ projects }, null, 2);
  await fs.writeFile(DATA_PATH, data, "utf-8");
}
