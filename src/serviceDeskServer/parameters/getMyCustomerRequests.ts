import { z } from 'zod';

export const GetMyCustomerRequestsSchema = z.object({
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
  /**
   * Filters results to customer requests where the issue summary matches the `searchTerm`. You can use
   * [wildcards](https://confluence.atlassian.com/display/JIRACORECLOUD/Search+syntax+for+text+fields) in the
   * `searchTerm`.
   */
  searchTerm: z.string().optional(),
  /** Filters results to customer requests from a specific service project. */
  serviceDeskId: z.string().optional(),
  /**
   * Filters results to customer requests where the user is the creator and/or participant:
   *
   * - `OWNED_REQUESTS` - Only return customer requests where the user is the creator.
   * - `PARTICIPATED_REQUESTS` - Only return customer requests where the user is a participant.
   * - `ALL_REQUESTS` - Return customer requests where the user is the creator or a participant.
   */
  requestOwnership: z.string().optional(),
  /**
   * Filters results to customer requests of a specific request type. You must also specify the `serviceDeskID` for the
   * service desk that the request type belongs to.
   */
  requestTypeId: z.string().optional(),
  /**
   * Filters results to customer requests that are resolved, unresolved, or either of the two:
   *
   * - `CLOSED_REQUESTS` - Only return customer requests that are resolved.
   * - `OPEN_REQUESTS` - Only return customer requests that are unresolved.
   * - `ALL_REQUESTS` - Returns customer requests that are either resolved or unresolved.
   */
  requestStatus: z.string().optional(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetMyCustomerRequests = z.input<typeof GetMyCustomerRequestsSchema>;
