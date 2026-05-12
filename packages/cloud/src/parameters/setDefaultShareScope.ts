import { z } from 'zod';
import { DefaultShareScopeSchema } from '../models';

export const SetDefaultShareScopeSchema = z.object({}).extend(DefaultShareScopeSchema.shape);

export type SetDefaultShareScope = z.input<typeof SetDefaultShareScopeSchema>;
