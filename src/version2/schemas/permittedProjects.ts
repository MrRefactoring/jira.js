import { z } from 'zod';
import { ProjectIdentifierBeanSchema } from './projectIdentifierBean';

/** A list of projects in which a user is granted permissions. */
export const PermittedProjectsSchema = z.object({
  /** A list of projects. */
  projects: z.array(ProjectIdentifierBeanSchema).optional(),
});

export type PermittedProjects = z.infer<typeof PermittedProjectsSchema>;
