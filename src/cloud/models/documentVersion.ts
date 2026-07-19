import { z } from 'zod';
import { apiObject } from '#/core';
/** The current version details of this workflow scheme. */

export const DocumentVersionSchema = apiObject({
  /** The version UUID. */
  id: z.string().optional(),
  /** The version number. */
  versionNumber: z.number().optional(),
});

export type DocumentVersion = z.infer<typeof DocumentVersionSchema>;
