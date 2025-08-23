import { z } from 'zod';
import { CustomTemplatesProjectDetailsSchema } from './customTemplatesProjectDetails';
import { CustomTemplateRequestDTOSchema } from './customTemplateRequestDTO';

/** Request to create a project using a custom template */
export const ProjectCustomTemplateCreateRequestDTOSchema = z.object({
  details: CustomTemplatesProjectDetailsSchema.optional(),
  template: CustomTemplateRequestDTOSchema.optional(),
});

export type ProjectCustomTemplateCreateRequestDTO = z.infer<typeof ProjectCustomTemplateCreateRequestDTOSchema>;
