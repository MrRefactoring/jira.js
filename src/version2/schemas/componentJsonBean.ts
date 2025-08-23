import { z } from 'zod';

export const ComponentJsonBeanSchema = z.object({
  ari: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  metadata: z.object({}).optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type ComponentJsonBean = z.infer<typeof ComponentJsonBeanSchema>;
