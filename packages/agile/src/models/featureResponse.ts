import { z } from 'zod';

export const FeatureResponseSchema = z.object({
  features: z
    .array(
      z.object({
        boardFeature: z
          .enum([
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
          ])
          .optional(),
        boardId: z.number().optional(),
        featureId: z.string().optional(),
        featureType: z.enum(['BASIC', 'ESTIMATION']).optional(),
        imageUri: z.string().optional(),
        learnMoreArticleId: z.string().optional(),
        learnMoreLink: z.string().optional(),
        localisedDescription: z.string().optional(),
        localisedGroup: z.string().optional(),
        localisedName: z.string().optional(),
        permissibleEstimationTypes: z
          .array(
            z.object({
              localisedDescription: z.string().optional(),
              localisedName: z.string().optional(),
              value: z.enum(['STORY_POINTS', 'ORIGINAL_ESTIMATE']).optional(),
            }),
          )
          .optional(),
        state: z.enum(['ENABLED', 'DISABLED', 'COMING_SOON']).optional(),
        toggleLocked: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type FeatureResponse = z.infer<typeof FeatureResponseSchema>;
