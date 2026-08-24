import { z } from 'zod';
import { apiObject } from '#/core';

export const GlobalConfigurationInSchema = apiObject({
  allowOtherObjectSchema: z.boolean().optional(),
  validateQuickCreate: z.boolean().optional(),
  quickCreateObjects: z.boolean().optional(),
});

export type GlobalConfigurationIn = z.infer<typeof GlobalConfigurationInSchema>;
