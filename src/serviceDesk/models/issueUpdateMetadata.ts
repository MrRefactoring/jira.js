import { z } from 'zod';
import { apiObject } from '#/core';
/** A list of editable field details. */

export const IssueUpdateMetadataSchema = apiObject({
  fields: z.record(z.string(), z.any()).optional(),
});

export type IssueUpdateMetadata = z.infer<typeof IssueUpdateMetadataSchema>;
