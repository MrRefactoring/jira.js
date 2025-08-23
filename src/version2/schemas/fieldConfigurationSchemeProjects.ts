import { z } from 'zod';
import { FieldConfigurationSchemeSchema } from './fieldConfigurationScheme';

/** Project list with assigned field configuration schema. */
export const FieldConfigurationSchemeProjectsSchema = z.object({
  fieldConfigurationScheme: FieldConfigurationSchemeSchema.optional(),
  /** The IDs of projects using the field configuration scheme. */
  projectIds: z.array(z.string()),
});

export type FieldConfigurationSchemeProjects = z.infer<typeof FieldConfigurationSchemeProjectsSchema>;
