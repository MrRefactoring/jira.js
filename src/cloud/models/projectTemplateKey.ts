import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectTemplateKeySchema = apiObject({
  key: z.string().optional(),
  uuid: z.string().optional(),
});

export type ProjectTemplateKey = z.infer<typeof ProjectTemplateKeySchema>;
