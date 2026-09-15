import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldMetadataSchema } from './fieldMetadata';

/** A list of editable field details. */
export const IssueUpdateMetadataSchema = apiObject({
  fields: z.record(z.string(), FieldMetadataSchema).optional(),
});

export type IssueUpdateMetadata = z.infer<typeof IssueUpdateMetadataSchema>;
