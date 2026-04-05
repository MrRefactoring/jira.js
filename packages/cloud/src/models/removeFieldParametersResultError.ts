import { z } from 'zod';

/** Error during remove field parameters operation. */
export const RemoveFieldParametersResultErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

export type RemoveFieldParametersResultError = z.infer<typeof RemoveFieldParametersResultErrorSchema>;
