import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldsSchema } from './fields';
/** The ID or key of a linked issue. */

export const LinkedIssueSchema = apiObject({
  fields: FieldsSchema.optional(),
  /** The ID of an issue. Required if `key` isn't provided. */
  id: z.string().optional(),
  /** The key of an issue. Required if `id` isn't provided. */
  key: z.string().optional(),
  /** The URL of the issue. */
  self: z.url().optional(),
});

export type LinkedIssue = z.infer<typeof LinkedIssueSchema>;
