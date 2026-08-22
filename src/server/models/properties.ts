import { z } from 'zod';
import { apiObject } from '#/core';

export const PropertiesSchema = apiObject({
  properties: z.record(z.string(), z.any()).optional(),
});

export type Properties = z.infer<typeof PropertiesSchema>;
