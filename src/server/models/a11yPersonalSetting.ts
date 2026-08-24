import { z } from 'zod';
import { apiObject } from '#/core';

export const A11yPersonalSettingSchema = apiObject({
  enabled: z.boolean().optional(),
  key: z.string().optional(),
});

export type A11yPersonalSetting = z.infer<typeof A11yPersonalSettingSchema>;
