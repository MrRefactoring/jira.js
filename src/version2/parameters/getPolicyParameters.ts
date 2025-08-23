import { z } from 'zod';

export const GetPolicyParametersSchema = z.object({});

export type GetPolicyParameters = z.infer<typeof GetPolicyParametersSchema>;
