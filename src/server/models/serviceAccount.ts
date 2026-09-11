import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceAccountSchema = apiObject({
  clientConfigurationId: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  projectKeys: z.array(z.string()).optional(),
});

export type ServiceAccount = z.infer<typeof ServiceAccountSchema>;
