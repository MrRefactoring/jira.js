import { z } from 'zod';
import { apiObject } from '#/core';
import { DocumentSchema } from './document';
import { DocumentVersionSchema } from './documentVersion';
/** Workflow metadata and usage detail. */

export const WorkflowMetadataRestModelSchema = apiObject({
  /** The description of the workflow. */
  description: DocumentSchema,
  /** The ID of the workflow. */
  id: z.string(),
  /** The name of the workflow. */
  name: z.string(),
  version: DocumentVersionSchema,
});

export type WorkflowMetadataRestModel = z.infer<typeof WorkflowMetadataRestModelSchema>;
