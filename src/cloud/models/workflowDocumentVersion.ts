import { z } from 'zod';
import { apiObject } from '#/core';
/** The version details of the workflow. */

export const WorkflowDocumentVersionSchema = apiObject({
  /** The version UUID. */
  id: z.string().optional(),
  /** The version number. */
  versionNumber: z.number().optional(),
});

export type WorkflowDocumentVersion = z.infer<typeof WorkflowDocumentVersionSchema>;
