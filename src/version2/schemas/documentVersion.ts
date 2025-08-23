import { z } from 'zod';

/** The current version details of this workflow scheme. */
export const DocumentVersionSchema = z.object({
  /** The version UUID. */
  id: z.string().optional(),
  /** The version number. */
  versionNumber: z.number().int().optional(),
});

export type DocumentVersion = z.infer<typeof DocumentVersionSchema>;
