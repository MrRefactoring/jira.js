import { z } from 'zod';

/** Identifiers for a project. */
export const ProjectIdentifiersSchema = z.object({
  /** The ID of the created project. */
  id: z.number(),
  /** The key of the created project. */
  key: z.string(),
  /** The URL of the created project. */
  self: z.url(),
});

export type ProjectIdentifiers = z.infer<typeof ProjectIdentifiersSchema>;
