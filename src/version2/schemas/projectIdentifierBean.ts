import { z } from 'zod';

/** The identifiers for a project. */
export const ProjectIdentifierBeanSchema = z.object({
  /** The ID of the project. */
  id: z.number().int().optional(),
  /** The key of the project. */
  key: z.string().optional(),
});

export type ProjectIdentifierBean = z.infer<typeof ProjectIdentifierBeanSchema>;
