import { z } from 'zod';

export const EpicSchema = z.object({
  id: z.number().optional(),
  key: z.string().optional(),
  self: z.url().optional(),
  name: z.string().optional(),
  summary: z.string().optional(),
  color: z
    .object({
      key: z.string().optional(),
    })
    .optional(),
  done: z.boolean().optional(),
});

export type Epic = z.infer<typeof EpicSchema>;
