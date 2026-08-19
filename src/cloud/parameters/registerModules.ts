import { z } from 'zod';
import { ConnectModulesSchema } from '../models';

export const RegisterModulesSchema = z.object(ConnectModulesSchema.shape);

export type RegisterModules = z.input<typeof RegisterModulesSchema>;
