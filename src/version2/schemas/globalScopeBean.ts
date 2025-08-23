import { z } from 'zod';

export const GlobalScopeBeanSchema = z.object({
  /**
   * Defines the behavior of the option in the global context.If notSelectable is set, the option cannot be set as the
   * field's value. This is useful for archiving an option that has previously been selected but shouldn't be used
   * anymore.If defaultValue is set, the option is selected by default.
   */
  attributes: z.array(z.enum(['notSelectable', 'defaultValue'])).optional(),
});

export type GlobalScopeBean = z.infer<typeof GlobalScopeBeanSchema>;
