import { z } from 'zod';
import { GetTeamResponseForPageSchema } from '#/models/getTeamResponseForPage';

export const PageWithCursorGetTeamResponseForPageSchema = z.object({
  cursor: z.string().optional(),
  last: z.boolean().optional(),
  nextPageCursor: z.string().optional(),
  size: z.number().optional(),
  total: z.number().optional(),
  values: z.array(GetTeamResponseForPageSchema).optional(),
});

export type PageWithCursorGetTeamResponseForPage = z.infer<typeof PageWithCursorGetTeamResponseForPageSchema>;
