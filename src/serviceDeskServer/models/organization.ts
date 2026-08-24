import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const OrganizationSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  _links: SelfLinkSchema.optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
