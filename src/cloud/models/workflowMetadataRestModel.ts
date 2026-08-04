import { z } from 'zod';
import { apiObject } from '#/core';
import { DocumentVersionSchema } from './documentVersion';
/** Workflow metadata and usage detail. */

export const WorkflowMetadataRestModelSchema = apiObject({
  /** The description of the workflow. */
  description: z.string(),
  /** The ID of the workflow. */
  id: z.string(),
  /** The name of the workflow. */
  name: z.string(),
  version: DocumentVersionSchema,
});

export type WorkflowMetadataRestModel = z.infer<typeof WorkflowMetadataRestModelSchema>;
