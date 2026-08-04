import { z } from 'zod';

export const GetProjectRolesSchema = z.record(z.string(), z.url());

export type GetProjectRoles = z.infer<typeof GetProjectRolesSchema>;
