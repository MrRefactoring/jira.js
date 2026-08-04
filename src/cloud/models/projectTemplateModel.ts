import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectArchetypeSchema } from './projectArchetype';
import { ProjectTemplateKeySchema } from './projectTemplateKey';
import { CustomTemplateOptionsSchema } from './customTemplateOptions';

export const ProjectTemplateModelSchema = apiObject({
  archetype: ProjectArchetypeSchema.optional(),
  defaultBoardView: z.string().optional(),
  description: z.string().optional(),
  liveTemplateProjectIdReference: z.number().optional(),
  name: z.string().optional(),
  projectTemplateKey: ProjectTemplateKeySchema.optional(),
  snapshotTemplate: z.record(z.string(), z.any()).optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  type: z.enum(['LIVE', 'SNAPSHOT']).optional(),
});

export type ProjectTemplateModel = z.infer<typeof ProjectTemplateModelSchema>;
