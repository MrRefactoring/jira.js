import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { EstimationConfigurationSchema } from './estimationConfiguration';

export const FeatureSchema = apiObject({
  boardFeature: openEnum([
    'SIMPLE_ROADMAP',
    'BACKLOG',
    'SPRINTS',
    'CALENDAR',
    'DEVTOOLS',
    'REPORTS',
    'ESTIMATION',
    'PAGES',
    'CODE',
    'SECURITY',
    'REQUESTS',
    'INCIDENTS',
    'RELEASES',
    'DEPLOYMENTS',
    'ISSUE_NAVIGATOR',
    'ON_CALL_SCHEDULE',
    'BOARD',
    'GOALS',
    'LIST_VIEW',
  ]).optional(),
  boardId: z.number().optional(),
  featureId: z.string().optional(),
  featureType: openEnum(['BASIC', 'ESTIMATION']).optional(),
  imageUri: z.string().optional(),
  learnMoreArticleId: z.string().optional(),
  learnMoreLink: z.string().optional(),
  localisedDescription: z.string().optional(),
  localisedGroup: z.string().optional(),
  localisedName: z.string().optional(),
  permissibleEstimationTypes: z.array(EstimationConfigurationSchema).optional(),
  state: openEnum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
  toggleLocked: z.boolean().optional(),
});

export type Feature = z.infer<typeof FeatureSchema>;
