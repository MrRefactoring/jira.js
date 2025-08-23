import { z } from 'zod';

export const GetDefaultShareScopeParametersSchema = z.object({});

export type GetDefaultShareScopeParameters = z.infer<typeof GetDefaultShareScopeParametersSchema>;
