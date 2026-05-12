import { z } from 'zod';
import { BulkTransitionSubmitInputSchema } from '#/models/bulkTransitionSubmitInput';

/** Issue Bulk Transition Payload */
export const IssueBulkTransitionPayloadSchema = z.object({
  /**
   * List of objects and each object has two properties:
   *
   * - Issues that will be bulk transitioned.
   * - TransitionId that corresponds to a specific transition of issues that share the same workflow.
   */
  bulkTransitionInputs: z.array(BulkTransitionSubmitInputSchema),
  /**
   * A boolean value that indicates whether to send a bulk change notification when the issues are being transitioned.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification: z.boolean().nullable().optional(),
});

export type IssueBulkTransitionPayload = z.infer<typeof IssueBulkTransitionPayloadSchema>;
