import { z } from 'zod';

/** A status category. */
export const StatusCategorySchema = z.object({
  /** The name of the color used to represent the status category. */
  colorName: z.string().optional(),
  /** The ID of the status category. */
  id: z.number().int().optional(),
  /** The key of the status category. */
  key: z.string().optional(),
  /** The name of the status category. */
  name: z.string().optional(),
  /** The URL of the status category. */
  self: z.string().optional(),
});

export type StatusCategory = z.infer<typeof StatusCategorySchema>;
