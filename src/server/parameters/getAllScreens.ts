import { z } from 'zod';

export const GetAllScreensSchema = z.object({
  search: z.string().optional(),
  expand: z.string().optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
});

export type GetAllScreens = z.input<typeof GetAllScreensSchema>;
