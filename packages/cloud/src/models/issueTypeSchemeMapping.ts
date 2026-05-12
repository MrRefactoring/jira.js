import { z } from 'zod';

/** Issue type scheme item. */
export const IssueTypeSchemeMappingSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
});

export type IssueTypeSchemeMapping = z.infer<typeof IssueTypeSchemeMappingSchema>;
