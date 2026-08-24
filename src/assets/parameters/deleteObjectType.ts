import { z } from 'zod';

export const DeleteObjectTypeSchema = z.object({
  id: z.string(),
});

export type DeleteObjectType = z.input<typeof DeleteObjectTypeSchema>;
