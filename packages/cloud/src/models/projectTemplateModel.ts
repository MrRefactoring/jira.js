import { z } from 'zod';
import { ProjectArchetypeSchema } from '#/models/projectArchetype';
import { ProjectTemplateKeySchema } from '#/models/projectTemplateKey';
import { CustomTemplateOptionsSchema } from '#/models/customTemplateOptions';

export const ProjectTemplateModelSchema = z.object({
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
