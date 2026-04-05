import { z } from 'zod';

export const EntrySchema = z.object({
  errors: z.array(z.string()).optional(),
  issueId: z.number().optional(),
  issueKey: z.string().optional(),
  status: z.number().optional(),
});

export type Entry = z.infer<typeof EntrySchema>;
