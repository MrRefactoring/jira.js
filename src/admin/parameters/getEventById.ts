import { z } from 'zod';

export const GetEventByIdSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the event to return */
  eventId: z.string(),
});

export type GetEventById = z.input<typeof GetEventByIdSchema>;
