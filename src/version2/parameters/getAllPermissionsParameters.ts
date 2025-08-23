import { z } from 'zod';

export const GetAllPermissionsParametersSchema = z.object({});

export type GetAllPermissionsParameters = z.infer<typeof GetAllPermissionsParametersSchema>;
