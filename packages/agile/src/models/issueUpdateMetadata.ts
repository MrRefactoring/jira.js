import { z } from 'zod';

/** A list of editable field details. */
export const IssueUpdateMetadataSchema = z.object({
  fields: z.record(z.string(), z.any()).optional(),
});

export type IssueUpdateMetadata = z.infer<typeof IssueUpdateMetadataSchema>;
