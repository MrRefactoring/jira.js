import { z } from 'zod';

export const GetServiceDesksSchema = z.object({
  /** The option to include archived service project. False by default. */
  includeArchived: z.string().optional(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type GetServiceDesks = z.input<typeof GetServiceDesksSchema>;
