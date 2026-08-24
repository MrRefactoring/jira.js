import { z } from 'zod';
import { apiObject } from '#/core';

export const ConfluencePageSchema = apiObject({
  id: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
});

export type ConfluencePage = z.infer<typeof ConfluencePageSchema>;
