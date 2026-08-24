import { z } from 'zod';

export const GetAllScreensSchema = z.object({
  search: z.string().optional(),
  expand: z.string().optional(),
  maxResults: z.string().optional(),
  startAt: z.string().optional(),
});

export type GetAllScreens = z.input<typeof GetAllScreensSchema>;
