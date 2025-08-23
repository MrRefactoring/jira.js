import { z } from 'zod';

/** A list of editable field details. */
export const IssueUpdateMetadataSchema = z.object({
  fields: z.object({}).optional(),
});

export type IssueUpdateMetadata = z.infer<typeof IssueUpdateMetadataSchema>;
