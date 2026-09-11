import { z } from 'zod';

export const GetIssueTypePropertyKeysSchema = z.object({
  /** The issue type from which the keys will be returned. */
  issueTypeId: z.string(),
});

export type GetIssueTypePropertyKeys = z.input<typeof GetIssueTypePropertyKeysSchema>;
