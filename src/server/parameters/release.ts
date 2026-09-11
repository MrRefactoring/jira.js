import { z } from 'zod';

export const ReleaseSchema = z.object({
  body: z.string().optional(),
});

export type Release = z.input<typeof ReleaseSchema>;
