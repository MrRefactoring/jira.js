import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { ApproverSchema } from './approver';
import { DateSchema } from './date';

export const ApprovalSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  /** Detailed list of the users who must provide a response to the approval. */
  approvers: z.array(ApproverSchema).optional(),
  /**
   * Indicates whether the user making the request is one of the approvers and can respond to the approval (true) or not
   * (false).
   */
  canAnswerApproval: z.boolean().optional(),
  completedDate: DateSchema.optional(),
  createdDate: DateSchema.optional(),
  /** Outcome of the approval, based on the approvals provided by all approvers. */
  finalDecision: openEnum(['approved', 'declined', 'pending']).optional(),
  /** ID of the approval. */
  id: z.string().optional(),
  /** Description of the approval being sought or provided. */
  name: z.string().optional(),
});

export type Approval = z.infer<typeof ApprovalSchema>;
