import { z } from 'zod';

/** Details of an issue type screen scheme. */
export const IssueTypeScreenSchemeSchema = z.object({
  /** The description of the issue type screen scheme. */
  description: z.string().optional(),
  /** The ID of the issue type screen scheme. */
  id: z.string(),
  /** The name of the issue type screen scheme. */
  name: z.string(),
});

export type IssueTypeScreenScheme = z.infer<typeof IssueTypeScreenSchemeSchema>;
