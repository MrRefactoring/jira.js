import { z } from 'zod';
import { apiObject } from '#/core';

export const CurrentUserSchema = apiObject({
  self: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  emailAddress: z.string().optional(),
  avatarUrls: z.record(z.string(), z.string()).optional(),
  displayName: z.string().optional(),
  active: z.boolean().optional(),
  deleted: z.boolean().optional(),
  timeZone: z.string().optional(),
  locale: z.string().optional(),
  groups: apiObject({
    size: z.number().optional(),
    items: z.array(z.record(z.string(), z.any())).optional(),
  }).optional(),
  applicationRoles: apiObject({
    size: z.number().optional(),
    items: z.array(z.record(z.string(), z.any())).optional(),
  }).optional(),
  expand: z.string().optional(),
});

export type CurrentUser = z.infer<typeof CurrentUserSchema>;
