import { z } from 'zod';

export const MoveScreenTabFieldParametersSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number().int(),
  /** The ID of the screen tab. */
  tabId: z.number().int(),
  /** The ID of the field. */
  id: z.string(),
  /**
   * The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't
   * provided.
   */
  after: z.string().optional(),
  /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
  position: z.enum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type MoveScreenTabFieldParameters = z.infer<typeof MoveScreenTabFieldParametersSchema>;
