import { z } from 'zod';

/** The identifiers for a project. */
export const ProjectIdentifierSchema = z.object({
  /** The ID of the project. */
  id: z.number().optional(),
  /** The key of the project. */
  key: z.string().optional(),
});

export type ProjectIdentifier = z.infer<typeof ProjectIdentifierSchema>;
