import { z } from 'zod';

export const MoveFieldBeanSchema = z.object({
  /**
   * The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't
   * provided.
   */
  after: z.string().optional(),
  /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
  position: z.enum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type MoveFieldBean = z.infer<typeof MoveFieldBeanSchema>;
