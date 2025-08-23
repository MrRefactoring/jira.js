import { z } from 'zod';

export const GetAllAccessibleProjectTypesParametersSchema = z.object({});

export type GetAllAccessibleProjectTypesParameters = z.infer<typeof GetAllAccessibleProjectTypesParametersSchema>;
