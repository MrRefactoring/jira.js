import { z } from 'zod';

export const ValidateSchema = z.object({
  body: z.string(),
});

export type Validate = z.input<typeof ValidateSchema>;
