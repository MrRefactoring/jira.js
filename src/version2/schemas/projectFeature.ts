import { z } from 'zod';

/** Details of a project feature. */
export const ProjectFeatureSchema = z.object({
  /** The key of the feature. */
  feature: z.string().optional(),
  /** URI for the image representing the feature. */
  imageUri: z.string().optional(),
  /** Localized display description for the feature. */
  localisedDescription: z.string().optional(),
  /** Localized display name for the feature. */
  localisedName: z.string().optional(),
  /** List of keys of the features required to enable the feature. */
  prerequisites: z.array(z.string()).optional(),
  /** The ID of the project. */
  projectId: z.number().int().optional(),
  /**
   * The state of the feature. When updating the state of a feature, only ENABLED and DISABLED are supported. Responses
   * can contain all values
   */
  state: z.enum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
  /** Whether the state of the feature can be updated. */
  toggleLocked: z.boolean().optional(),
});

export type ProjectFeature = z.infer<typeof ProjectFeatureSchema>;
