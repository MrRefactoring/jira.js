import { z } from 'zod';
import { apiObject } from '#/core';

export const SimpleLinkSchema = apiObject({
  href: z.string().optional(),
  iconClass: z.string().optional(),
  id: z.string().optional(),
  label: z.string().optional(),
  params: z.record(z.string(), z.any()).optional(),
  styleClass: z.string().optional(),
  title: z.string().optional(),
  weight: z.number().optional(),
});

export type SimpleLink = z.infer<typeof SimpleLinkSchema>;
