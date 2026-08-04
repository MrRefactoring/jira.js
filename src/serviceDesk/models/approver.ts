import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { UserSchema } from './user';

export const ApproverSchema = apiObject({
  approver: UserSchema.optional(),
  /** Decision made by the approver. */
  approverDecision: openEnum(['approved', 'declined', 'pending']).optional(),
});

export type Approver = z.infer<typeof ApproverSchema>;
