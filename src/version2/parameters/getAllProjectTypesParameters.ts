import { z } from 'zod';

export const GetAllProjectTypesParametersSchema = z.object({});

export type GetAllProjectTypesParameters = z.infer<typeof GetAllProjectTypesParametersSchema>;
