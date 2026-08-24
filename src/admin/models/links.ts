import { z } from 'zod';
import { apiObject } from '#/core';

export const LinksSchema = apiObject({
  ticket: z.string().optional(),
});

export type Links = z.infer<typeof LinksSchema>;
