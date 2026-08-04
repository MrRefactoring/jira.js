import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectIdentifierSchema } from './projectIdentifier';
/** A list of projects in which a user is granted permissions. */

export const PermittedProjectsSchema = apiObject({
  /** A list of projects. */
  projects: z.array(ProjectIdentifierSchema).optional(),
});

export type PermittedProjects = z.infer<typeof PermittedProjectsSchema>;
