import { z } from 'zod';
import { PasswordPolicyCreateUserSchema } from '../models';

export const PolicyCheckCreateUserSchema = z.object(PasswordPolicyCreateUserSchema.shape);

export type PolicyCheckCreateUser = z.input<typeof PolicyCheckCreateUserSchema>;
