import { z } from 'zod';

/** Details of an issue type scheme. */
export const IssueTypeSchemeSchema = z.object({
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId: z.string().optional(),
  /** The description of the issue type scheme. */
  description: z.string().optional(),
  /** The ID of the issue type scheme. */
  id: z.string(),
  /** Whether the issue type scheme is the default. */
  isDefault: z.boolean().optional(),
  /** The name of the issue type scheme. */
  name: z.string(),
});

export type IssueTypeScheme = z.infer<typeof IssueTypeSchemeSchema>;
