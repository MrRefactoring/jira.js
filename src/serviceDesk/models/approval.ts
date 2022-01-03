import { Approver } from './approver';
import { Date } from './date';
import { SelfLink } from './selfLink';

export interface Approval {
  /** ID of the approval. */
  id?: string;
  /** Description of the approval being sought or provided. */
  name?: string;
  /** Outcome of the approval, based on the approvals provided by all approvers. */
  finalDecision?: string;
  /** Indicates whether the user making the request is one of the approvers and can respond to the approval (true) or not (false). */
  canAnswerApproval?: boolean;
  /** Detailed list of the users who must provide a response to the approval. */
  approvers?: Approver[];
  createdDate?: Date;
  completedDate?: Date;
  Links?: SelfLink;
}
