import type { BulkTransitionSubmitInput } from '../models';

/** Issue Bulk Transition Payload */
export interface SubmitBulkTransition {
  /**
   * List of objects and each object has two properties:
   *
   * Issues that will be bulk transitioned. TransitionId that corresponds to a specific transition of issues that share
   * the same workflow.
   */
  bulkTransitionInputs: BulkTransitionSubmitInput[];
  /**
   * A boolean value that indicates whether to send a bulk change notification when the issues are being transitioned.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean;
}
