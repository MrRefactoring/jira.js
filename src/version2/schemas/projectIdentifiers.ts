import { z } from 'zod';

/** Identifiers for a project. */
export const ProjectIdentifiersSchema = z.object({
  /** The ID of the created project. */
  id: z.number().int(),
  /** The key of the created project. */
  key: z.string(),
  /** The URL of the created project. */
  self: z.string(),
});

export type ProjectIdentifiers = z.infer<typeof ProjectIdentifiersSchema>;
