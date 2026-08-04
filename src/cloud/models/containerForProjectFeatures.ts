import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectFeatureSchema } from './projectFeature';
/** The list of features on a project. */

export const ContainerForProjectFeaturesSchema = apiObject({
  /** The project features. */
  features: z.array(ProjectFeatureSchema).optional(),
});

export type ContainerForProjectFeatures = z.infer<typeof ContainerForProjectFeaturesSchema>;
