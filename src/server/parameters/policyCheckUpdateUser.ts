import { z } from 'zod';
import { PasswordPolicyUpdateUserSchema } from '../models';

export const PolicyCheckUpdateUserSchema = z.object(PasswordPolicyUpdateUserSchema.shape);

export type PolicyCheckUpdateUser = z.input<typeof PolicyCheckUpdateUserSchema>;
