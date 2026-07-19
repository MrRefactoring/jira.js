import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectLandingPageInfoSchema = apiObject({
  attributes: z.record(z.string(), z.any()).optional(),
  boardId: z.number().optional(),
  boardName: z.string().optional(),
  projectKey: z.string().optional(),
  projectType: z.string().optional(),
  queueCategory: z.string().optional(),
  queueId: z.number().optional(),
  queueName: z.string().optional(),
  simpleBoard: z.boolean().optional(),
  simplified: z.boolean().optional(),
  url: z.string().optional(),
});

export type ProjectLandingPageInfo = z.infer<typeof ProjectLandingPageInfoSchema>;
