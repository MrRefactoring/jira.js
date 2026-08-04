import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomTemplateOptionsSchema } from './customTemplateOptions';
/** The request details to generate template from a project */

export const SaveProjectTemplateRequestSchema = apiObject({
  /** The ID of the target project */
  projectId: z.number().optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  /** The type of the template: LIVE | SNAPSHOT */
  templateType: z.enum(['LIVE', 'SNAPSHOT']).optional(),
});

export type SaveProjectTemplateRequest = z.infer<typeof SaveProjectTemplateRequestSchema>;
