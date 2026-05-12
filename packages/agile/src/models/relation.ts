import { z } from 'zod';

export const RelationSchema = z.object({
  id: z.string().optional(),
  self: z.url().optional(),
});

export type Relation = z.infer<typeof RelationSchema>;
