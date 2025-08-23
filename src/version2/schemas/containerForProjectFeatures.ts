import { z } from 'zod';
import { ProjectFeatureSchema } from './projectFeature';

/** The list of features on a project. */
export const ContainerForProjectFeaturesSchema = z.object({
  /** The project features. */
  features: z.array(ProjectFeatureSchema).optional(),
});

export type ContainerForProjectFeatures = z.infer<typeof ContainerForProjectFeaturesSchema>;
