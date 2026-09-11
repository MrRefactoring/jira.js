import { z } from 'zod';
import { DefaultShareScopeSchema } from '../models';

export const SetDefaultShareScopeSchema = z.object(DefaultShareScopeSchema.shape);

export type SetDefaultShareScope = z.input<typeof SetDefaultShareScopeSchema>;
