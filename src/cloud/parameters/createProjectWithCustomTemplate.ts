import { z } from 'zod';
import { ProjectCustomTemplateCreateRequestDTOSchema } from '../models';

export const CreateProjectWithCustomTemplateSchema = z.object(ProjectCustomTemplateCreateRequestDTOSchema.shape);

export type CreateProjectWithCustomTemplate = z.input<typeof CreateProjectWithCustomTemplateSchema>;
