import { z } from 'zod';

/** Details of an issue type screen scheme. */
export const IssueTypeScreenSchemeUpdateDetailsSchema = z.object({
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type IssueTypeScreenSchemeUpdateDetails = z.infer<typeof IssueTypeScreenSchemeUpdateDetailsSchema>;
