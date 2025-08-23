import { z } from 'zod';

export const GetLocaleParametersSchema = z.object({});

export type GetLocaleParameters = z.infer<typeof GetLocaleParametersSchema>;
