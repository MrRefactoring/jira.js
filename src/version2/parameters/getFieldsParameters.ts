import { z } from 'zod';

export const GetFieldsParametersSchema = z.object({});

export type GetFieldsParameters = z.infer<typeof GetFieldsParametersSchema>;
