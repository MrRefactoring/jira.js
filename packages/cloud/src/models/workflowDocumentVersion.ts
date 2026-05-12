import { z } from 'zod';

/** The version details of the workflow. */
export const WorkflowDocumentVersionSchema = z.object({
  /** The version UUID. */
  id: z.string().optional(),
  /** The version number. */
  versionNumber: z.number().optional(),
});

export type WorkflowDocumentVersion = z.infer<typeof WorkflowDocumentVersionSchema>;
