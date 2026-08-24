import { z } from 'zod';

export const GetProjectRolesSchema = z.record(z.string(), z.string());

export type GetProjectRoles = z.infer<typeof GetProjectRolesSchema>;
