import { z } from 'zod';

export const GetCommentsSchema = z.object({
  /** Whether to sort ascending */
  asc: z.string().optional(),
  /** The ID of the object */
  objectId: z.string(),
});

export type GetComments = z.input<typeof GetCommentsSchema>;
