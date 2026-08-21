import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "Web Development",
  "Mobile Apps",
  "Cloud Solutions",
  "DevOps & CI/CD",
  "AI & Automation",
  "Cybersecurity",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const urlOrEmpty = z
  .string()
  .refine(
    (val) => val === "" || z.string().url().safeParse(val).success,
    { message: "Must be a valid URL or empty string" }
  )
  .default("");

export const ProjectSchema = z.object({
  id: z
    .string()
    .min(1, "ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "ID must contain only letters, numbers, hyphens, and underscores"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),

  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be 120 characters or fewer"),

  shortDescription: z
    .string()
    .min(1, "Short description is required")
    .max(300, "Short description must be 300 characters or fewer"),

  description: z.string().min(1, "Description is required"),

  category: z.enum(PROJECT_CATEGORIES, {
    errorMap: () => ({ message: `Category must be one of: ${PROJECT_CATEGORIES.join(", ")}` }),
  }),

  industry: z.string().min(1, "Industry is required"),

  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  year: z
    .number()
    .int()
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Year must be 2100 or earlier"),

  technologies: z.array(z.string().min(1)).min(1, "At least one technology is required"),

  image: z.string().min(1, "Image path is required"),

  gallery: z.array(z.string()).default([]),

  liveUrl: urlOrEmpty,
  githubUrl: urlOrEmpty,

  client: z.string().default(""),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  results: z.array(z.string()).default([]),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsDataSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type ProjectsData = z.infer<typeof ProjectsDataSchema>;

export const PartialProjectSchema = ProjectSchema.partial().required({ id: true });
export type PartialProject = z.infer<typeof PartialProjectSchema>;
