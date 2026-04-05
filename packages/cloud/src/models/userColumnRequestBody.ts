import { z } from 'zod';

export const UserColumnRequestBodySchema = z.object({
  columns: z.array(z.string()).optional(),
});

export type UserColumnRequestBody = z.infer<typeof UserColumnRequestBodySchema>;
