import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceDeskLinkSchema = apiObject({
  self: z.url().optional(),
  portal: z.url().optional(),
});

export type ServiceDeskLink = z.infer<typeof ServiceDeskLinkSchema>;
