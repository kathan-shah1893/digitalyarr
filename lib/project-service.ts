import { readProjectsFile, writeProjectsFile } from "./project-repository";
import type { Project } from "./validation/project-schema";

export async function getAllProjects(): Promise<Project[]> {
  return readProjectsFile();
}

export async function getPublishedProjects(): Promise<Project[]> {
  const all = await readProjectsFile();
  return all.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await readProjectsFile();
  return all
    .filter((p) => p.published && p.featured)
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await readProjectsFile();
  return all.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const all = await readProjectsFile();
  return all.find((p) => p.id === id) ?? null;
}

export async function createProject(project: Project): Promise<Project> {
  const all = await readProjectsFile();

  if (all.some((p) => p.id === project.id)) {
    throw new Error(`A project with id "${project.id}" already exists.`);
  }
  if (all.some((p) => p.slug === project.slug)) {
    throw new Error(`The slug "${project.slug}" is already in use.`);
  }

  await writeProjectsFile([...all, project]);
  return project;
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  const all = await readProjectsFile();
  const index = all.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Project "${id}" not found.`);
  }

  if (data.slug && data.slug !== all[index].slug) {
    if (all.some((p) => p.slug === data.slug && p.id !== id)) {
      throw new Error(`The slug "${data.slug}" is already in use.`);
    }
  }

  const updated = { ...all[index], ...data };
  all[index] = updated;
  await writeProjectsFile(all);
  return updated;
}

export async function deleteProject(id: string): Promise<void> {
  const all = await readProjectsFile();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) {
    throw new Error(`Project "${id}" not found.`);
  }
  await writeProjectsFile(next);
}

export async function duplicateProject(id: string): Promise<Project> {
  const all = await readProjectsFile();
  const source = all.find((p) => p.id === id);
  if (!source) throw new Error(`Project "${id}" not found.`);

  const timestamp = Date.now().toString(36);
  const copy: Project = {
    ...source,
    id: `${source.id}-copy-${timestamp}`,
    slug: `${source.slug}-copy-${timestamp}`,
    title: `${source.title} (Copy)`,
    published: false,
    featured: false,
    order: all.length,
  };

  await writeProjectsFile([...all, copy]);
  return copy;
}

export async function reorderProjects(orderedIds: string[]): Promise<void> {
  const all = await readProjectsFile();

  const reordered = orderedIds.map((id, index) => {
    const p = all.find((p) => p.id === id);
    if (!p) throw new Error(`Project "${id}" not found.`);
    return { ...p, order: index };
  });

  const unordered = all
    .filter((p) => !orderedIds.includes(p.id))
    .map((p, i) => ({ ...p, order: orderedIds.length + i }));

  await writeProjectsFile([...reordered, ...unordered]);
}

export async function replaceAllProjects(projects: Project[]): Promise<void> {
  await writeProjectsFile(projects);
}
