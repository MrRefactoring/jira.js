import { z } from 'zod';

/** Details of the association between an issue type scheme and project. */
export const IssueTypeSchemeProjectAssociationSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type IssueTypeSchemeProjectAssociation = z.infer<typeof IssueTypeSchemeProjectAssociationSchema>;
