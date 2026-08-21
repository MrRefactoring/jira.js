import { z } from 'zod';

export const SetColumnsUrlEncodedSchema = z.object({
  username: z.string().optional(),
  columns: z.array(z.string()).optional(),
});

export type SetColumnsUrlEncoded = z.input<typeof SetColumnsUrlEncodedSchema>;
