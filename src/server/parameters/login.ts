import { z } from 'zod';
import { AuthParamsSchema } from '../models';

export const LoginSchema = z.object(AuthParamsSchema.shape);

export type Login = z.input<typeof LoginSchema>;
