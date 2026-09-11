import { z } from 'zod';
import { apiObject } from '#/core';

export const BooleanSettingSchema = apiObject({
  value: z.boolean().optional(),
});

export type BooleanSetting = z.infer<typeof BooleanSettingSchema>;
