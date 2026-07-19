import { z } from 'zod';
import { apiObject } from '#/core';
/** Identifiers for a project. */

export const ProjectIdentifiersSchema = apiObject({
  /** The ID of the created project. */
  id: z.number(),
  /** The key of the created project. */
  key: z.string(),
  /** The URL of the created project. */
  self: z.string().url(),
});

export type ProjectIdentifiers = z.infer<typeof ProjectIdentifiersSchema>;
