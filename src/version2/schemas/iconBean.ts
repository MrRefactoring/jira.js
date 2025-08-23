import { z } from 'zod';

/** An icon. */
export const IconBeanSchema = z.object({
  /** The URL of the tooltip, used only for a status icon. */
  link: z.string().optional(),
  /** The title of the icon, for use as a tooltip on the icon. */
  title: z.string().optional(),
  /** The URL of a 16x16 pixel icon. */
  url16x16: z.string().optional(),
});

export type IconBean = z.infer<typeof IconBeanSchema>;
