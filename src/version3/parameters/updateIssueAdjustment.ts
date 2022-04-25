import { UpdateIssueAdjustmentDetails } from '../models';

export interface UpdateIssueAdjustment extends UpdateIssueAdjustmentDetails {
  /** The ID of the issue adjustment. */
  issueAdjustmentId: string;
}
