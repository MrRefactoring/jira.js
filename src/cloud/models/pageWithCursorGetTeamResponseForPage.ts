import { z } from 'zod';
import { apiObject } from '#/core';
import { GetTeamResponseForPageSchema } from './getTeamResponseForPage';

export const PageWithCursorGetTeamResponseForPageSchema = apiObject({
  cursor: z.string().optional(),
  last: z.boolean().optional(),
  nextPageCursor: z.string().optional(),
  size: z.number().optional(),
  total: z.number().optional(),
  values: z.array(GetTeamResponseForPageSchema).optional(),
});

export type PageWithCursorGetTeamResponseForPage = z.infer<typeof PageWithCursorGetTeamResponseForPageSchema>;
