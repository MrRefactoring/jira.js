import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';

export const ApproverSchema = apiObject({
  approver: UserSchema.optional(),
  /** Decision made by the approver. */
  approverDecision: z.enum(['approved', 'declined', 'pending']).optional(),
});

export type Approver = z.infer<typeof ApproverSchema>;
