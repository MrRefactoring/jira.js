import type { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectTemplateKeySchema } from './projectTemplateKey';

export const SaveTemplateResponseSchema = apiObject({
  projectTemplateKey: ProjectTemplateKeySchema.optional(),
});

export type SaveTemplateResponse = z.infer<typeof SaveTemplateResponseSchema>;
