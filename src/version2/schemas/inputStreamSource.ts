import { z } from 'zod';

export const InputStreamSourceSchema = z.object({
  inputStream: z.object({}).optional(),
});

export type InputStreamSource = z.infer<typeof InputStreamSourceSchema>;
