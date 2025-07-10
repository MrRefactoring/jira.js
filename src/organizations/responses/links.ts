import { z } from 'zod';

export const LinksSchema = z.strictObject({
  self: z.string().url(),
  prev: z.string().url().optional(),
  next: z.string().url().optional(),
});

export type Links = z.infer<typeof LinksSchema>;
