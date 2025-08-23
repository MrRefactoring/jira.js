import { z } from 'zod';
import { CustomTemplatesProjectDetailsSchema } from './customTemplatesProjectDetails';
import { CustomTemplateRequestDTOSchema } from './customTemplateRequestDTO';

export const CreateProjectWithCustomTemplateParametersSchema = z.object({
  details: CustomTemplatesProjectDetailsSchema.optional(),
  template: CustomTemplateRequestDTOSchema.optional(),
});

export type CreateProjectWithCustomTemplateParameters = z.infer<typeof CreateProjectWithCustomTemplateParametersSchema>;
