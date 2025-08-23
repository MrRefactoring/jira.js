import { z } from 'zod';

/** Details of the name, description, and default issue type for an issue type scheme. */
export const IssueTypeSchemeUpdateDetailsSchema = z.object({
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId: z.string().optional(),
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description: z.string().optional(),
  /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type IssueTypeSchemeUpdateDetails = z.infer<typeof IssueTypeSchemeUpdateDetailsSchema>;
