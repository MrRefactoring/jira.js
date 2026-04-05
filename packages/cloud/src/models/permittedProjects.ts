import { z } from 'zod';
import { ProjectIdentifierSchema } from '#/models/projectIdentifier';

/** A list of projects in which a user is granted permissions. */
export const PermittedProjectsSchema = z.object({
  /** A list of projects. */
  projects: z.array(ProjectIdentifierSchema).optional(),
});

export type PermittedProjects = z.infer<typeof PermittedProjectsSchema>;
