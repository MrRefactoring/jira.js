import { z } from 'zod';

export const GetCustomerRequestByIdOrKeySchema = z.object({
  /** The ID or Key of the customer request to be returned */
  issueIdOrKey: z.string(),
  /**
   * A multi-value parameter indicating which properties of the customer request to expand, where:
   *
   * - `serviceDesk` returns additional service desk details.
   * - `requestType` returns additional customer request type details.
   * - `participant` returns the participant details.
   * - `sla` returns the SLA information.
   * - `status` returns the status transitions, in chronological order.
   * - `attachment` returns the attachments.
   * - `action` returns the actions that the user can or cannot perform.
   * - `comment` returns the comments.
   * - `comment.attachment` returns the attachment details for each comment.
   * - `comment.renderedBody` (Experimental) return the rendered body in HTML format (in addition to the raw body) for
   *   each comment.
   */
  expand: z.array(z.string()).optional(),
});

export type GetCustomerRequestByIdOrKey = z.input<typeof GetCustomerRequestByIdOrKeySchema>;
