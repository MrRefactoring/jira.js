import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationLinkSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  uri: z.string().optional(),
  error: z.boolean().optional(),
});

export type ApplicationLink = z.infer<typeof ApplicationLinkSchema>;
