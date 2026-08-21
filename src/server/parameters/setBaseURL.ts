import { z } from 'zod';

export const SetBaseURLSchema = z.object({
  body: z.string().optional(),
});

export type SetBaseURL = z.input<typeof SetBaseURLSchema>;
