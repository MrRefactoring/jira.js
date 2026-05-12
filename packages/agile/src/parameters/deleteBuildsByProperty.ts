import { z } from 'zod';

export const DeleteBuildsByPropertySchema = z.object({
  /**
   * Property key used as a query parameter to select which submitted builds to delete. Must match a key you previously
   * sent in submitBuilds `properties` (same rules: string values, max 5 properties on submit, keys must not contain ':'
   * or start with '_'). Official docs and OpenAPI description example: accountId=account-123.
   */
  accountId: z.string().max(255, 'accountId must be at most 255 characters'),
  /**
   * Optional additional property filter combined with accountId (AND). Official example: repoId=repo-345 alongside
   * accountId. Must match a key previously supplied in submitBuilds `properties`.
   */
  repoId: z.string().max(255, 'repoId must be at most 255 characters').optional(),
});

export type DeleteBuildsByProperty = z.input<typeof DeleteBuildsByPropertySchema>;
