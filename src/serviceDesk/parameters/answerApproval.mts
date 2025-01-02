import { ApprovalDecisionRequest } from '../models/index.mjs';

export interface AnswerApproval extends ApprovalDecisionRequest {
  /** The ID or key of the customer request to be updated. */
  issueIdOrKey: string;
  /** The ID of the approval to be updated. */
  approvalId: number;
}
