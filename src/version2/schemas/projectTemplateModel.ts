import { z } from 'zod';
import { ProjectArchetypeSchema } from './projectArchetype';
import { ProjectTemplateKeySchema } from './projectTemplateKey';
import { CustomTemplateOptionsSchema } from './customTemplateOptions';

export const ProjectTemplateModelSchema = z.object({
  archetype: ProjectArchetypeSchema.optional(),
  defaultBoardView: z.string().optional(),
  description: z.string().optional(),
  liveTemplateProjectIdReference: z.number().int().optional(),
  name: z.string().optional(),
  projectTemplateKey: ProjectTemplateKeySchema.optional(),
  snapshotTemplate: z.object({}).optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  type: z.enum(['LIVE', 'SNAPSHOT']).optional(),
});

export type ProjectTemplateModel = z.infer<typeof ProjectTemplateModelSchema>;
