import { z } from 'zod';

/** Details about the operations available in this version. */
export const SimpleLinkSchema = z.object({
  href: z.string().optional(),
  iconClass: z.string().optional(),
  id: z.string().optional(),
  label: z.string().optional(),
  styleClass: z.string().optional(),
  title: z.string().optional(),
  weight: z.number().int().optional(),
});

export type SimpleLink = z.infer<typeof SimpleLinkSchema>;
