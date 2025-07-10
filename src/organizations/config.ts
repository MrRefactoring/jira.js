import { z } from 'zod';

export const ConfigSchema = z.strictObject({
  accessToken: z
    .string()
    .min(1, 'Access token cannot be empty')
    .transform(val => {
      const trimmed = val.trim();

      return trimmed.startsWith('Bearer ') ? trimmed.slice(7) : trimmed;
    }),
});

export type Config = z.infer<typeof ConfigSchema>;
