import { z } from 'zod';

export const InputStreamSourceSchema = z.object({
  inputStream: z.record(z.string(), z.any()).optional(),
});

export type InputStreamSource = z.infer<typeof InputStreamSourceSchema>;
