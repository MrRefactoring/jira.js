import { z } from 'zod';

export const UpdateShowWhenEmptyIndicatorSchema = z.object({
  /** Id of tab */
  tabId: z.number(),
  /** Id of screen */
  screenId: z.number(),
  /** New value of 'showWhenEmptyIndicator' */
  newValue: z.boolean(),
  /** Id of field */
  id: z.string(),
});

export type UpdateShowWhenEmptyIndicator = z.input<typeof UpdateShowWhenEmptyIndicatorSchema>;
