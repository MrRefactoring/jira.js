import { z } from 'zod';

export const ProjectLandingPageInfoSchema = z.object({
  attributes: z.object({}).optional(),
  boardId: z.number().int().optional(),
  boardName: z.string().optional(),
  projectKey: z.string().optional(),
  projectType: z.string().optional(),
  queueCategory: z.string().optional(),
  queueId: z.number().int().optional(),
  queueName: z.string().optional(),
  simpleBoard: z.boolean().optional(),
  simplified: z.boolean().optional(),
  url: z.string().optional(),
});

export type ProjectLandingPageInfo = z.infer<typeof ProjectLandingPageInfoSchema>;
