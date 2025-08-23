import { z } from 'zod';

/** The application the linked item is in. */
export const ApplicationSchema = z.object({
  /**
   * The name of the application. Used in conjunction with the (remote) object icon title to display a tooltip for the
   * link's icon. The tooltip takes the format "[application name] icon title". Blank items are excluded from the
   * tooltip title. If both items are blank, the icon tooltop displays as "Web Link". Grouping and sorting of links may
   * place links without an application name last.
   */
  name: z.string().optional(),
  /** The name-spaced type of the application, used by registered rendering apps. */
  type: z.string().optional(),
});

export type Application = z.infer<typeof ApplicationSchema>;
