import { z } from 'zod';

export const GetModulesParametersSchema = z.object({});

export type GetModulesParameters = z.infer<typeof GetModulesParametersSchema>;
