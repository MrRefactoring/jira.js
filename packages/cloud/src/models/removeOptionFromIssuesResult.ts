import { z } from 'zod';
import { SimpleErrorCollectionSchema } from '#/models/simpleErrorCollection';

export const RemoveOptionFromIssuesResultSchema = z.object({
  errors: SimpleErrorCollectionSchema.optional(),
  /** The IDs of the modified issues. */
  modifiedIssues: z.array(z.number()).optional(),
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues: z.array(z.number()).optional(),
});

export type RemoveOptionFromIssuesResult = z.infer<typeof RemoveOptionFromIssuesResultSchema>;
