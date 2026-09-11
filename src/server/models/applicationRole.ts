import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationRoleSchema = apiObject({
  defaultGroups: z.array(z.string()).optional(),
  defined: z.boolean().optional(),
  groups: z.array(z.string()).optional(),
  hasUnlimitedSeats: z.boolean().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  numberOfSeats: z.number().optional(),
  platform: z.boolean().optional(),
  remainingSeats: z.number().optional(),
  selectedByDefault: z.boolean().optional(),
  userCount: z.number().optional(),
  userCountDescription: z.string().optional(),
});

export type ApplicationRole = z.infer<typeof ApplicationRoleSchema>;
