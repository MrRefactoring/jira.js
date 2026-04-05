import { z } from 'zod';

export const PartialSuccessSchema = z.object({
  entries: z
    .array(
      z.object({
        errors: z.array(z.string()).optional(),
        issueId: z.number().optional(),
        issueKey: z.string().optional(),
        status: z.number().optional(),
      }),
    )
    .optional(),
});

export type PartialSuccess = z.infer<typeof PartialSuccessSchema>;
