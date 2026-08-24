import { z } from 'zod';

export const GetCustomerRequestByIdOrKeySchema = z.object({
  /**
   * This is a multi-value parameter indicating which properties of the customer request to expand:
   *
   * - `serviceDesk` - Return additional details for each service project in the response.
   * - `requestType` - Return additional details for each request type in the response.
   * - `participant` - Return the participant details, if any, for each customer request in the response.
   * - `sla` - Return the SLA information on the given request.
   * - `status` - Return the status transitions, in chronological order, for each customer request in the response.
   */
  expand: z.string().optional(),
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
});

export type GetCustomerRequestByIdOrKey = z.input<typeof GetCustomerRequestByIdOrKeySchema>;
