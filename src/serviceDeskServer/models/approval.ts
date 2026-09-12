import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ApproverSchema } from './approver';
import { DateSchema } from './date';
import { SelfLinkSchema } from './selfLink';
import { ApprovalConditionSchema } from './approvalCondition';

export const ApprovalSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  finalDecision: openEnum(['approved', 'declined', 'pending']).optional(),
  canAnswerApproval: z.boolean().optional(),
  approvers: z.array(ApproverSchema).optional(),
  createdDate: DateSchema.optional(),
  completedDate: DateSchema.optional(),
  _links: SelfLinkSchema.optional(),
  condition: ApprovalConditionSchema.optional(),
});

export type Approval = z.infer<typeof ApprovalSchema>;
