import { z } from 'zod';
import { PermissionsKeysSchema } from '../models';

export const GetPermittedProjectsSchema = z.object({}).extend(PermissionsKeysSchema.shape);

export type GetPermittedProjects = z.input<typeof GetPermittedProjectsSchema>;
