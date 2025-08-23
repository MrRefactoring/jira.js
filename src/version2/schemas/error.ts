import { z } from 'zod';

export const ErrorSchema = z.object({
  count: z.number().int().optional(),
  issueIdsOrKeys: z.array(z.string()).optional(),
  message: z.string().optional(),
});

export type Error = z.infer<typeof ErrorSchema>;
