import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const PortalSchema = apiObject({
  description: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
  get_links: SelfLinkSchema.optional(),
});

export type Portal = z.infer<typeof PortalSchema>;
