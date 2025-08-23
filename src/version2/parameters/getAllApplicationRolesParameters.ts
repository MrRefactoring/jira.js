import { z } from 'zod';

export const GetAllApplicationRolesParametersSchema = z.object({});

export type GetAllApplicationRolesParameters = z.infer<typeof GetAllApplicationRolesParametersSchema>;
