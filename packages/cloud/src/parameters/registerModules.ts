import { z } from 'zod';
import { ConnectModulesSchema } from '../models';

export const RegisterModulesSchema = z.object({}).extend(ConnectModulesSchema.shape);

export type RegisterModules = z.input<typeof RegisterModulesSchema>;
