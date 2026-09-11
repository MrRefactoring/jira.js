import { z } from 'zod';

export const GetDefaultSchema = z.object({
  /** The id of the scheme. */
  id: z.number(),
  /** When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself. */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetDefault = z.input<typeof GetDefaultSchema>;
