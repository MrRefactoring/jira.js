import { z } from 'zod';
import { apiObject } from '#/core';

export const GadgetSchema = apiObject({
  filterId: z.number().optional(),
  filterName: z.string().optional(),
  gadgetUri: z.url().optional(),
  jql: z.string().optional(),
  portalId: z.number().optional(),
  userPrefs: z.record(z.string(), z.any()).optional(),
});

export type Gadget = z.infer<typeof GadgetSchema>;
