import type { z } from 'zod';
import { apiObject } from '#/core';
import { CustomTemplatesProjectDetailsSchema } from './customTemplatesProjectDetails';
import { CustomTemplateRequestDTOSchema } from './customTemplateRequestDTO';
/** Request to create a project using a custom template */

export const ProjectCustomTemplateCreateRequestDTOSchema = apiObject({
  details: CustomTemplatesProjectDetailsSchema.optional(),
  template: CustomTemplateRequestDTOSchema.optional(),
});

export type ProjectCustomTemplateCreateRequestDTO = z.infer<typeof ProjectCustomTemplateCreateRequestDTOSchema>;
