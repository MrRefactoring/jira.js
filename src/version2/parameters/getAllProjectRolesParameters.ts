import { z } from 'zod';

export const GetAllProjectRolesParametersSchema = z.object({});

export type GetAllProjectRolesParameters = z.infer<typeof GetAllProjectRolesParametersSchema>;
